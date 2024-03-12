import { Router } from 'express';
import userRoutes from './user.routes';
import clubRoutes from './club.routes';
import memberRoutes from './member.routes';
import teamRoutes from './team.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/clubs', clubRoutes);
router.use('/clubs', memberRoutes);
router.use('/clubs', teamRoutes);

export default router;