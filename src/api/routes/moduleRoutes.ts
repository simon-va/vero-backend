import express from 'express';
import ModuleController from '../controllers/moduleController';
import { auth, AuthType } from '../middlewares/auth';
import { ParamValue, validateParams } from '../middlewares/validate';

const router = express.Router();

router.get(
    '/',
    auth([AuthType.NoMember, AuthType.NoToken]),
    ModuleController.getModules
);

router.post(
    '/:moduleId/clubs/:clubId',
    validateParams([ParamValue.ModuleId, ParamValue.ClubId]),
    auth([AuthType.IsAdmin]),
    ModuleController.addModuleToClub
);

export default router;
