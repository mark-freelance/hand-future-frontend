/**
 * Copyright (c) Hand-Future @2023. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type Hero, type HeroRelation, type User, type Work, Prisma } from "@prisma/client";

// 1. Base Hero type from Prisma
export type IHeroBase = Hero;

// 2. Hero with relations
export const heroDetailSchema = {
  include: {
    user: true,
    fromHeroes: {
      include: {
        to: true,
      },
    },
    toHeroes: {
      include: {
        from: true,
      },
    },
    works: true,
  },
} as const;

export type IHeroDetail = Hero & {
  user: User;
  fromHeroes: (HeroRelation & {
    to: Hero;
  })[];
  toHeroes: (HeroRelation & {
    from: Hero;
  })[];
  works: Work[];
};

// 3. Hero without user data (for creation/update)
export type IHeroWithoutUser = Omit<Hero, "userId">;

// 4. Share card specific interface
export interface IShareCard extends Pick<Hero, 
  'id' | 'name' | 'title' | 'avatar' | 'cities'
> {
  description?: string;
  partners?: string[];
  cover?: string;
  articleTitle: string;
  articleContent: string;
}

// 5. Hero relation type
export type IHeroRelation = HeroRelation & {
  from: Hero;
  to: Hero;
};

// Add IHero export
export interface IHero {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string | null;
  photos: string[];
  avatar: string | null;
  avatarOrigin: string | null;
  title: string | null;
  cities: string | null;
  userId: string;
}
