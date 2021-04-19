import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Connection, createConnection } from 'typeorm';

import userRoutes from './routes'

const PORT:number = 1338;
const app = express();
createConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(userRoutes);

app.use( (req, res) => {
    res.status(404).json({ "message": "Página no encontrada" });
})

app.listen(PORT , () => 
	console.info(
		`==> 😎 Listening on port ${PORT}.
			Open http://0.0.0.0:${PORT}/ in your browser.`
	)

);