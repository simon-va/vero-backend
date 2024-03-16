import express from 'express';
import ModuleController from '../controllers/moduleController';
import { auth, AuthType } from '../middlewares/auth';

const router = express.Router();

router.get(
    '/',
    auth([AuthType.NoMember, AuthType.NoToken]),
    ModuleController.getModules
);

export default router;
