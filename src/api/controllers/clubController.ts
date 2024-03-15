import { NextFunction, Request, Response } from 'express';
import sequelize from '../../db/config';
import Club from '../../db/models/club';
import User from '../../db/models/user';
import { CreationClubAttributes } from '../../types/club';
import ClubService from '../services/clubService';

class ClubController {
    static async createClub(req: Request, res: Response, next: NextFunction) {
        const user: User = res.locals.user;
        const body: CreationClubAttributes = req.body;

        const t = await sequelize.transaction();

        try {
            const { club, member } = await ClubService.createClub({
                user,
                clubPayload: body,
                transaction: t
            });

            await t.commit();

            res.status(201).send({ club, member });
        } catch (error) {
            await t.rollback();

            next(error);
        }
    }

    static async getClubsByUserId(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id }: User = res.locals.user;

        try {
            const clubs = await ClubService.getClubsByUserId(id);

            res.status(200).send(clubs);
        } catch (error) {
            next(error);
        }
    }

    static async deleteClub(req: Request, res: Response, next: NextFunction) {
        const clubId: Club['id'] = Number(req.params.clubId);

        try {
            await ClubService.deleteClub(clubId);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default ClubController;
