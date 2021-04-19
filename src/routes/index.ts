
import { Router } from 'express';
const router = Router();
import userRoutes from './user.routes';

router.use('/users', userRoutes);

export default router;
