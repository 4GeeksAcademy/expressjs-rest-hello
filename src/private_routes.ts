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
import * as actions from './actions';

// declare a new router to include all the endpoints
const router = Router();

router.get('/user/me', safe(actions.getMe));
router.get('/user', safe(actions.getUsers));
router.get('/user/:id', safe(actions.getUser));
router.put('/user/:id', safe(actions.updateUser));
router.delete('/user/:id', safe(actions.deleteUser));

// manage planets, this will all have to be implemented for characters as well
router.get('/planet', safe(actions.getPlanets));
router.post('/planet', safe(actions.createPlanet));

// this has to be implemented for characters as well
router.post('/favorite/planet/:planet_id', safe(actions.addFavoritePlanet));
router.delete('/favorite/planet/:planet_id', safe(actions.removeFavoritePlanet));

export default router;
