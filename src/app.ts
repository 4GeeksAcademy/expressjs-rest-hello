import 'reflect-metadata';
import 'express-async-errors'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { url, renderRoutes } from "./utils"
import dotenv from 'dotenv';
import setupAdmin from "./admin"
import userRoutes from './routes'

dotenv.config()// load .env variables
const PORT:number = 3001;
const PUBLIC_URL = url(PORT)
const app = express();

// create a database connection based on the ./ormconfig.js file
const connectionPromess = createConnection();

// Middlewares
app.use(cors()) //disable CORS validations
app.use(express.json()) // the API will be JSON based for serialization
app.use(morgan('dev')); //logging

// Import routes from ./src/routes.ts file
app.use(userRoutes);

// render home website with usefull information for students
app.get('/', (req, res) => res.status(404).send(renderRoutes(app, PUBLIC_URL)))

// add admin interface for database administration
setupAdmin('/admin')
	.then((router) => {
		// add all admin routes like /admin, 
		app.use('/admin', router)
		// default empty route for 404
		app.use( (req, res) => res.status(404).json({ "message": "Not found" }))
	})

// start the express server, listen to requests on PORT
app.listen(PORT , () => 
	console.info(
`==> 😎 Listening on port ${PORT}.
	Open ${PUBLIC_URL} in your browser.`
	)
);