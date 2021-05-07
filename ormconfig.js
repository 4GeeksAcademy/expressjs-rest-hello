const dotenv = require('dotenv-override');
dotenv.config({override: true})// load .env variables

console.log("process.env.DATABASE_URL", process.env.DATABASE_URL)
module.exports = {
	type: "postgres",
	url: process.env.DATABASE_URL,
	entities: ["./dist/entities/*.js"],
	logging: false,
    synchronize: process.env.NODE_ENV === 'development',
    migrations: ["./dist/migrations/*.js"],
    cli: {
        "migrationsDir": "./dist/migrations"
    }
}