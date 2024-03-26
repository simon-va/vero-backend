import { Router } from 'express';
import clubRoutes from './clubRoutes';
import groupRoutes from './groupRoutes';
import memberRoutes from './memberRouters';
import moduleRoutes from './moduleRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/clubs', clubRoutes);
router.use('/clubs', memberRoutes);
router.use('/clubs', groupRoutes);
router.use('/modules', moduleRoutes);

export default router;
