import { MongoClient } from 'mongodb'

// extend global interface, ref: https://mariusschulz.com/blog/declaring-global-variables-in-typescript
declare global {
	var _mongoClientPromise: undefined | Promise<MongoClient>
}

const { ObjectId } = require('mongodb');

export const client = new MongoClient(process.env.MONGODB_URI as string);
export const database = client.db(process.env.MONGODB_DB);
