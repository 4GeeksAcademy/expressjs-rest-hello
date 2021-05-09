/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router } from 'express';
import { safe } from './utils';
import {  getUsers, getMe, getUser, updateUser, deleteUser, createPlanet, getPlanets } from './actions';

// declare a new router to include all the endpoints
const router = Router();

router.get('/user/me', safe(getMe));
router.get('/user', safe(getUsers));
router.get('/planet', safe(getPlanets));
router.get('/user/:id', getUser);
router.post('/planet', safe(createPlanet));
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
