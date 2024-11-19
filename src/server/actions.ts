import {Client, collectPaginatedAPI} from "@notionhq/client"
import fs, {promises} from "fs"
import {flatten} from "lodash"
import * as path from "path"
import type {GraphData} from "react-force-graph-3d"
import {publicDir} from "~/server/file";

import {env} from "../env"
import {persistHeroAvatar, user2hero, user2heroRelation} from "../lib/user"
import type {IUserInNotion} from "../schema/user"

import prisma from "./db"

const notion = new Client({
    auth: env.NOTION_TOKEN,
})

/**
 * 遍历prisma.hero 调用 persistHeroAvatar 函数更新用户数据
 */
export const updateHeroAvatars = async () => {
    const heroes = await prisma.hero.findMany()

    for (let i = 0; i < heroes.length; i++) {
        const hero = heroes[i]
        console.log(`Updating avatar for hero ${i + 1}/${heroes.length}: ${hero.name}, ${hero.avatar}`)
        if (!hero.avatar || hero.avatar.startsWith('/') && fs.existsSync(path.resolve(publicDir, hero.avatar))) {
            console.log("  passed")
        } else {
            const newHero = await persistHeroAvatar(hero)
            await prisma.hero.update({where: {id: hero.id}, data: newHero})
            console.log("  updated hero avatar")
        }
    }
}

export const initNotion = async (options?: { dumpJson?: boolean }) => {
    console.log("-- initing data...")

    const usersInNotion = (await collectPaginatedAPI(notion.databases.query, {
        database_id: env.NOTION_DATABASE_ID,
    })) as IUserInNotion[]

    if (options?.dumpJson) {
        const fp = path.join(__dirname, "data.json")
        console.log(`-- dumping data info ${fp}`)
        await promises.writeFile(fp, JSON.stringify(usersInNotion, null, 2))
        console.log("-- dumped")
    }

    for (let index = 0; index < usersInNotion.length; index++) {
        const user = user2hero(usersInNotion[index])
        // const user = await persistHeroAvatar(_user);
        console.log(`--> upserting user[${index + 1} / ${usersInNotion.length}]: ${user}`)

        await prisma.hero.upsert({
            where: {id: user.id}, create: {
                ...user, user: {
                    create: {},
                },
            }, update: {
                ...user,
            },
        })
    }

    await prisma.heroRelation.deleteMany()

    const relations = flatten(usersInNotion.map(user2heroRelation))
    const batchSize = 10
    for (let i = 0; i < relations.length; i += batchSize) {
        const batch = relations.slice(i, i + batchSize)
        await prisma.heroRelation.createMany({
            data: batch,
        })
        console.log(`--> Created relations batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(relations.length / batchSize)}`,)
    }
}

export const readNotion = async (): Promise<GraphData> => {
    try {
        console.log("Attempting to connect to database...")
        const nodes = await prisma.hero.findMany({
            where: {
                avatar: {not: null},
            },
        })
        console.log("Successfully retrieved nodes:", nodes.length)
        const nodeIds = nodes.map(i => i.id)

        const links = await prisma.heroRelation.findMany({
            where: {
                fromId: {in: nodeIds}, toId: {
                    in: nodeIds, gt: prisma.heroRelation.fields.fromId,
                },
            },
        })

        return {
            nodes, links: links.map(r => ({
                source: r.fromId, target: r.toId,
            })),
        }
    } catch (error) {
        console.error("Database error:", error)
        throw error
    }
}

void readNotion()
