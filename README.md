# Daily Diet API

## 📚 About

This is a simple API for a diet tracker application. It allows users to create, read, update, and delete meals, as well as view and manage their diet metrics.

### Rules

- [x] It must be possible to create a user
- [x] It must be possible to identify the user between requests
- [x] It must be possible to register a meal, with the following information:
  > *The meals must be related to a user.*
  - Name
  - Description
  - Date and Time
  - Is it within the diet or not
- [x] It must be possible to list all meals of a user
- [x] It must be possible to view a single meal
- [x] It must be possible to edit a meal, being able to change all the data:
  - Name
  - Description
  - Date and Time
  - Is it within the diet or not
- [x] It must be possible to delete a meal
- [] It must be possible to recover the metrics of a user
  - [] Total number of registered meals
  - [] Total number of meals within the diet
  - [] Total number of meals outside the diet
  - [] Best sequence of meals within the diet
- [] The user can only view, edit and delete the meals they created

---

## 🚀 Technologies

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Fastify](https://www.fastify.io/)
- [JWT](https://jwt.io/)

## 📚 Documentation

- [Prisma](https://www.prisma.io/docs)
- [Knex](https://knexjs.org/)
- [JWT](https://jwt.io/docs)
