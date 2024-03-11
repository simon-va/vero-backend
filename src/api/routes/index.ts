import { Router } from 'express';
import userRoutes from './user.routes';
import clubRoutes from './club.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/clubs', clubRoutes);

export default router;