
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createToken, createUser } from './actions';

const router = Router();

// login route (generates a token if valid email & pass)
router.post('/token', safe(createToken));
// signup route, creates a new user in the DB
router.post('/user', safe(createUser));

export default router;
