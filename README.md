# Restaurant POS (Point-of-Sale) Fullstack Application

Welcome to the Restaurant POS (Point-of-Sale) Fullstack Application! This repository contains both the frontend and backend components of a comprehensive restaurant management application. It has been developed as the final project for the WildCode School's coding bootcamp.

## Project Details

- Created by [Surmava Git](https://github.com/surmavagit) and [Deni Gogov](https://github.com/denigogov) as part of their third project in a 5-month coding bootcamp.
- Their cohort was led by their facilitator, [@diraneyya](https://github.com/diraneyya).
- Unfortunately, their cohort marked the end of Wild Code School in Germany.



## Introduction

The Restaurant POS Fullstack Application is designed to provide restaurants with a modern and efficient solution for accepting remote orders via various devices such as phones and tablets. This fully responsive application offers a user-friendly interface and aims to streamline the ordering process for restaurant staff.


## Setup

Before running the application, please ensure that you have completed the following steps:

1. Install Moonrepo by visiting the official [Moonrepo website](https://moonrepo.dev/docs/install) and following the provided instructions.
2. Clone this project repository.
3. Create two `.env` files:
   - in the `packages/prisma-client` directory
   - in the `apps/server` directory

## Instructions

 To run the Restaurant POS Fullstack Application, follow the steps below:

1. Open a terminal or command prompt.
2. Navigate to the project directory.
3. Run the following commands to start the project:
    * To run the frontend and backend run the following comand 
    ```bash 
    moon run :dev
    ```
    This command will automatically fetch and install all the necessary dependencies for both the frontend and backend
    - To run only the backend, use the following command:
    ```bash
    moon run server:dev
    ```
    - To run only the frontend, use the following command:
    ```bash
    moon run client:dev
    ```


   - To access the Prisma database studio, which provides a visual interface for managing your database, run the following command:
   ```bash
   moon run prisma:studio
   ```

The frontend will be available at `localhost:3000`, while the backend will be accessible at `localhost:4000`.
## Organization

TODO: explain the organization of the repository, including the prisma-client and prisma-queries worspaces/projects

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [React Router 6.4](https://reactrouter.com/en/main)
- [SASS](https://sass-lang.com/)
- [ExpressJS](expressjs.com)
- [Prisma](https://www.prisma.io/) ORM, stands for an Object-Relational-Mapper
- [PostgreSQL](https://www.postgresql.org/)
- [JSON Web Tokens](https://jwt.io/)
- [Argon2](https://www.npmjs.com/package//argon2)
- [PNPM Workspaces](https://pnpm.io/workspaces)
- [Moonrepo](https://moonrepo.dev/)
- [Rome](https://rome.tools/) Linter/Formatter

## Contribution

TODO: (consider linking to an [external document](./CONTRIBUTION.md), mainly the variable naming for endpoint queries and types
