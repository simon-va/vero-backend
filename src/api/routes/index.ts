import { Router } from 'express';
import clubRoutes from './clubRoutes';
import memberRoutes from './memberRouters';
import moduleRoutes from './moduleRoutes';
import teamRoutes from './teamRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/clubs', clubRoutes);
router.use('/clubs', memberRoutes);
router.use('/clubs', teamRoutes);
router.use('/modules', moduleRoutes);

export default router;
