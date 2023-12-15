import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import pgConnectionString from 'pg-connection-string';
import { default as express } from 'express';
import { environmentVariables } from './types';
import * as db from './db';
import { apiRouter } from './routers/api';
const app = express();

async function runMigrations(options: postgres.Options<{}> | undefined) {
  const sql = postgres({ ...options, max: 1 });
  const db = drizzle(sql);
  await migrate(db, { migrationsFolder: 'migrations' });
}

async function main() {
  // setup
  const envVariables = environmentVariables.parse(process.env);
  const connectionConfig = pgConnectionString.parse(envVariables.DB_CONNECTION_URL);
  const connectionOptions: postgres.Options<{}> | undefined = {
    host: connectionConfig.host ?? undefined,
    port: connectionConfig.port ? parseInt(connectionConfig.port) : undefined,
    user: connectionConfig.user,
    password: connectionConfig.password,
    database: connectionConfig.database ?? undefined,
    ssl: connectionConfig.ssl as undefined,
  };
  const sql = postgres(connectionOptions);
  const dbPool = drizzle(sql, { schema: db });
  // run migrations
  await runMigrations(connectionOptions);
  app.use('/api', apiRouter({ dbPool }));
  app.listen(
    !isNaN(Number(envVariables.PORT)) ? Number(envVariables.PORT) : 8080,
    '0.0.0.0',
    () => {
      console.log(`Listening on port: ${envVariables.PORT ?? 8080}`);
    },
  );
}

main();
