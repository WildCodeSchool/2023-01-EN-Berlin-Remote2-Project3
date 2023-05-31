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
- `moon run prisma:studio`            runs Prisma Studio, which allows to browse the database and make changes without affecting the migration history

`migrate` and `migrate-start` commands require entering a name for the new migration

***

## Naming conventions


