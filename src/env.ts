// @ts-expect-error - Environmental variables are validated at runtime
import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

// dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL
// console.log({DATABASE_URL})
// console.log(process.env)

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(), NOTION_TOKEN: z.string(), NOTION_DATABASE_ID: z.string(),
    }, client: {
        NEXT_PUBLIC_BACKEND_ENDPOINT: z.string().url().optional(),
    }, runtimeEnv: {
        DATABASE_URL,
        NOTION_TOKEN: process.env.NOTION_TOKEN,
        NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
        NEXT_PUBLIC_BACKEND_ENDPOINT: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
    },
});
