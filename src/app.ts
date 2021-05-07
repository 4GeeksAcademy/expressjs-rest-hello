import 'express-async-errors'//must always be the first, ideal for error handling
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { url, renderRoutes } from "./utils"
import userRoutes from './routes'
import jwt from 'jwt-express'

const PORT:number = 3001;
const PUBLIC_URL = url(PORT)
const app = express();

// create a database connection based on the ./ormconfig.js file
const connectionPromess = createConnection();

// Middlewares
app.use(cors()) //disable CORS validations
app.use(express.json()) // the API will be JSON based for serialization
app.use(morgan('dev')); //logging

// add two middlewars to handle request with JWT token
app.use(jwt.init('secret'))
app.use(((err: any, req: any, res: any, next: any) => {
	if (err) console.error(err);
	if (err.name === 'UnauthorizedError') {
	  res.status(401).json({ status: 'invalid token' });
	}
	next();
}))
// Import routes from ./src/routes.ts file
app.use(userRoutes);

// render home website with usefull information for students
app.get('/', (req, res) => res.status(404).send(renderRoutes(app, PUBLIC_URL)))

// default empty route for 404
app.use( (req, res) => res.status(404).json({ "message": "Not found" }))

// start the express server, listen to requests on PORT
app.listen(PORT , () => 
	console.info(
`==> 😎 Listening on port ${PORT}.
	Open ${PUBLIC_URL} in your browser.`
	)
);