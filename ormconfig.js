const dotenv = require('dotenv');
dotenv.config()// load .env variables

module.exports = {
	type: "postgres",
	url: process.env.DATABASE_URL,
	entities: process.env.NODE_ENV === 'development' ? ["./src/entities/*.ts"] : ["./dist/entities/*.js"],
	logging: false,
    synchronize: process.env.NODE_ENV === 'development',
    migrations: ["./src/migrations/*.js"],
    cli: {
        "migrationsDir": "./src/migrations"
    }
}