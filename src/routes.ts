
import { Router } from 'express';
import { safe } from './utils';
import { getUsers, getUser, createUser, updateUser, deleteUser } from './actions';
const router = Router();

router.get('/user', safe(getUsers));
router.get('/user/:id', getUser);
router.post('/user', safe(createUser));
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
