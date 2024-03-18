import { NextFunction, Request, Response } from 'express';
import Club from '../../db/models/club';
import Module from '../../db/models/module';
import ModuleService from '../services/moduleService';

class ModuleController {
    static async getModules(req: Request, res: Response, next: NextFunction) {
        const clubId: Club['id'] = Number(req.params.clubId);

        try {
            const modules = await ModuleService.getModules(clubId);

            res.status(200).send(modules);
        } catch (error) {
            next(error);
        }
    }

    static async addModuleToClub(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const clubId: Club['id'] = Number(req.params.clubId);
        const moduleId: Module['id'] = Number(req.params.moduleId);

        try {
            await ModuleService.addModuleToClub(clubId, moduleId);

            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    static async removeModuleFromClub(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const clubId: Club['id'] = Number(req.params.clubId);
        const moduleId: Module['id'] = Number(req.params.moduleId);

        try {
            await ModuleService.removeModuleFromClub(clubId, moduleId);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default ModuleController;
