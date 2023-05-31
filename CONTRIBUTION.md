## Database

The structure of the database and the mapping logic are described in [schema.prisma](packages/prisma-client/prisma/schema.prisma).

Prisma generates migration sql files based on changes in the schema.prisma file
and applies those sql files to create the database.

Our migration files contain sql queries that fill the database with sample data - users, menu, orders, etc.
The passwords of the sample users can be found in [sampleusers.md](sampleusers.md)

Our schema also defines the type of the database as PostgreSQL.
Prisma has support for other types of databases (e.g. MySQL, Mongoose) and it is possible to migrate,
but the sql commands for filling the database with data will have to be altered manually.

#### moon commands for working with the database:

- `moon run prisma:reset`             deletes the database and then recreates it using the migration sql files
- `moon run prisma:migrate`           creates a migration sql file based on the changes in the schema and applies it immediately
- `moon run prisma:migrate-start`     creates a migration sql file that you can edit before applying
- `moon run prisma:migrate-end`       applies the edited migration sql file
- `moon run prisma:studio`            runs Prisma Studio for browsing the database and making changes there without affecting the migration history

`migrate` and `migrate-start` commands require entering a name for the new migration

***

## Naming conventions

[Prisma-queries](packages/prisma-queries/src/index.ts) contain several different entities:
1. objects with the logic for quering the database (used by the server);
2. the types of objects received from the database;
3. mapping functions for these objects (used by the server);
4. the types of resulting objects (used by the server and the client).

The names of the entities in the file follow this syntax:

`entityEndpoint`

Possible `entities` are:
- "query" for prisma queries;
- "DbResponse" for the types of database responses;
- "map" for mapping functions that are applied to database responses;
- "Response" for the types of the results of the mapping functions.

`Endpoints` are described by the HTTP request method and the url route.

e.g. In `queryGetTablesById` "query" is the entity, "Get" is the HTTP request method, and TablesById stands for /tables/:id url route.

e.g. In `ResponseGetTablesMine` "Response" is the entity, "Get" is the HTTP request method, and TablesMine stands for /tables/mine url route.