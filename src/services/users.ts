import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as db from '../db';
import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';

export function getUser(dbPool: PostgresJsDatabase<typeof db>) {
  return async function (req: Request, res: Response) {
    try {
      const userId = req.session.userId;
      const user = await dbPool.query.users.findFirst({
        where: eq(db.users.id, userId),
      });

      if (!user) {
        return res.status(401).json({ errors: ['No user found'] });
      }

      return res.json({ data: user });
    } catch (error: any) {
      console.error(`[ERROR] ${JSON.stringify(error)}`);
      return res.sendStatus(500);
    }
  };
}

export function getRegistration(dbPool: PostgresJsDatabase<typeof db>) {
  return async function (req: Request, res: Response) {
    const sessionUserId = req.session.userId;
    const userId = req.params.userId;
    if (userId !== sessionUserId) {
      return res.status(400).json({
        errors: [
          {
            message: 'Not authorized to query this user',
          },
        ],
      });
    }

    const registration = await dbPool.query.registrations.findFirst({
      where: eq(db.registrations.userId, userId),
    });

    const usersToGroups = await dbPool.query.usersToGroups.findMany({
      where: eq(db.usersToGroups.userId, userId),
    });

    const out = { ...registration, groups: usersToGroups };
    return res.json({ data: out });
  };
}
