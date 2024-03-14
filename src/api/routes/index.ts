import { Router } from 'express';
import userRoutes from './userRoutes';
import clubRoutes from './clubRoutes';
import memberRoutes from './memberRouters';
import teamRoutes from './teamRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/clubs', clubRoutes);
router.use('/clubs', memberRoutes);
router.use('/clubs', teamRoutes);

export default router;
