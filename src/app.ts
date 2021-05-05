import 'reflect-metadata';
import 'express-async-errors'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { url, renderRoutes } from "./utils"
import dotenv from 'dotenv';
import userRoutes from './routes'

dotenv.config()// load .env variables
const PORT:number = 3001;
const PUBLIC_URL = url(PORT)
const app = express();

createConnection({
	type: "postgres",
	url: process.env.DATABASE_URL,
	entities: process.env.NODE_ENV === 'development' ? ["./src/entities/*.ts"] : ["./dist/entities/*.js"],
	logging: false,
    migrations: ["migration/*.js"],
    cli: {
        "migrationsDir": "migration"
    }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(userRoutes);

app.get('/', (req, res) => {
	res.status(404).send(renderRoutes(app, PUBLIC_URL))
})
app.use( (req, res) => {
    res.status(404).json({ "message": "Not found" });
})



app.listen(PORT , () => 
	console.info(
`==> 😎 Listening on port ${PORT}.
	Open ${PUBLIC_URL} in your browser.`
	)

);