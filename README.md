# CSCI 390: Senior Capstone
Elijah Verdoorn, Deandre Bauswell, David Ellenberger

Fall 2017

# Technologies

To get started developing on this project, you'll need the following technologies configured on your machine:
 - Node.js
 - NPM
 - MySQL

The project relies heavily on the following packages:
 - Express
 - Sequelize

# Installation

To begin developing, do the following:

1. Clone this repo
2. Start MySQL
3. Run `scripts/initDatabase.sql` on your local MySQL instance
4. Install node packages with `$ npm install`
5. Migrate the database by running the migrations found in the `migrations` folder. This can be accomplished by running `$ npm run db:migrate:up`
6. Start a development server with `$ npm start`

Happy hacking!!
