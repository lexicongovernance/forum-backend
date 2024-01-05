import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as db from '../db';
import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';

export function getGroups(dbPool: PostgresJsDatabase<typeof db>) {
  return async function (req: Request, res: Response) {
    const groups = await dbPool.query.groups.findMany();
    return res.json({ data: groups });
  };
}

export async function getGroupsPerUser(dbPool: PostgresJsDatabase<typeof db>) {
  return async function (req: Request, res: Response) {
    const userId = req.session.userId;
    try {
      const query = await dbPool.query.usersToGroups.findMany({
        with: {
          group: true,
        },
        where: eq(db.usersToGroups.userId, userId),
      });
      const out = query.map((r) => r.group);
      return res.json({ data: out });
    } catch (e) {
      console.log('error getting groups per user ' + JSON.stringify(e));
      return res.status(500).json({ error: 'internal server error' });
    }
  };
}
