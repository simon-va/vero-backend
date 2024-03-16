import { NextFunction, Request, Response } from 'express';
import ModuleService from '../services/moduleService';

class ModuleController {
    static async getModules(req: Request, res: Response, next: NextFunction) {
        try {
            const modules = await ModuleService.getModules();

            res.status(200).json(modules);
        } catch (error) {
            next(error);
        }
    }
}

export default ModuleController;
