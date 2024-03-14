import { NextFunction, Request, Response } from 'express';
import { CreationClubAttributes } from '../../types/club';
import { UserAttributes } from '../../types/user';
import ClubService from '../services/clubService';

class ClubController {
    static async createClub(req: Request, res: Response, next: NextFunction) {
        const user: UserAttributes = res.locals.user;
        const body: CreationClubAttributes = req.body;

        try {
            const { club, member } = await ClubService.createClub({
                user,
                clubPayload: body
            });

            res.status(201).send({ club, member });
        } catch (error) {
            next(error);
        }
    }

    static async getClubsByUserId(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id }: UserAttributes = res.locals.user;

        try {
            const clubs = await ClubService.getClubsByUserId(id);

            res.status(200).send(clubs);
        } catch (error) {
            next(error);
        }
    }

    static async deleteClub(req: Request, res: Response, next: NextFunction) {
        const clubId = Number(req.params.clubId);

        try {
            await ClubService.deleteClub({ clubId });

            res.status(200).send({ message: 'Club deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default ClubController;
