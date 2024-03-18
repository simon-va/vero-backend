import express from 'express';
import ModuleController from '../controllers/moduleController';
import { auth, AuthType } from '../middlewares/auth';
import { ParamValue, validateParams } from '../middlewares/validate';

const router = express.Router();

router.get(
    '/clubs/:clubId',
    validateParams([ParamValue.ClubId]),
    auth(),
    ModuleController.getModules
);

router.post(
    '/:moduleId/clubs/:clubId',
    validateParams([ParamValue.ModuleId, ParamValue.ClubId]),
    auth([AuthType.IsAdmin]),
    ModuleController.addModuleToClub
);

router.delete(
    '/:moduleId/clubs/:clubId',
    validateParams([ParamValue.ModuleId, ParamValue.ClubId]),
    auth([AuthType.IsAdmin]),
    ModuleController.removeModuleFromClub
);

export default router;
