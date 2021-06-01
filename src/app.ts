import 'express-async-errors'//must always be the first, ideal for error handling
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { url, renderIndex } from "./utils"
import privateRoutes from './private_routes'
import publicRoutes from './public_routes'

var PORT = process.env.PORT || '3001';
const PUBLIC_URL = url(PORT)
const app = express();

// create a database connection based on the ./ormconfig.js file
const connectionPromess = createConnection();

/* 
Middlewares: every time you see "app.use" we are including a new
middleware to the express server, you can read more about middle wares here:
https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples
*/
app.use(cors()) //disable CORS validations
app.use(express.json()) // the API will be JSON based for serialization
app.use(morgan('dev')); //logging

// render home website with usefull information for boilerplate developers (students)
app.get('/', (req, res) => renderIndex(app, PUBLIC_URL).then(html => res.status(404).send(html)))

// Import public routes from ./src/public_routes.ts file
// this line has to be ABOVE the JWT middleware to avoid
// the jwt middleware to influence these enpoints
app.use(publicRoutes);

/**
 * ⚠️ IMPORTANT
 * This is the place to include your JWT middleware that will make private routes really private 
 * you can ready more about it here: https://github.com/4GeeksAcademy/expressjs-rest-hello/blob/master/docs/JWT_AUTHETICATION.md
 * */

// Import private routes from ./src/private_routes.ts file
// this line has to be BELOW the JWT middleware to enforce
// all these routes to be private
app.use(privateRoutes);

// default empty route for 404
app.use( (req, res) => res.status(404).json({ "message": "Not found" }))

// start the express server, listen to requests on PORT
app.listen(PORT , () => 
	console.info(
`==> 😎 Listening on port ${PORT}.
   Open ${PUBLIC_URL} in your browser.`
	)
);