# Forum backend

## Project structure

1. [db](./src/db/) contains all the db models.
2. [routers](./src/routers/) contains all the api routers which map urls to the service.
3. [services](./src/services/) contains all business logic for the routes.
4. [middleware](./src/middleware/) contains all the middleware that is used in the routers before the code reaches the service.
5. [modules](./src/modules/) contains all voting models implemented in the forum backend.
6. [types](./src/types/) contains all the zod types that are needed for validation.

## For developers

1. install [nodejs v20](https://nodejs.org/en/download)
2. install [pnpm](https://pnpm.io/installation#using-npm)
3. start a postgres `docker run --name postgres  -e POSTGRES_PASSWORD=secretpassword -e POSTGRES_USER=postgres -p 5432:5432 -d postgres`
4. update .env with connection string `postgresql://postgres:secretpassword@localhost:5432`
5. pnpm i
6. pnpm dev

### unit testing

- expects a database to be available at `postgresql://postgres:secretpassword@localhost:5432`

### db migrations

1. create a file in the [db](./src/db/) with the new table schema
2. run `pnpm generate`
3. restart server and migrations should auto run
