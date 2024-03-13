import { Request, Response } from 'express';
import { CreationClubAttributes } from '../../types/club';
import { UserAttributes } from '../../types/user';
import { MemberAttributes } from '../../types/member';
import ClubHandler from '../handlers/club.handler';

class ClubController {
    static async createClub(req: Request, res: Response) {
        try {
            const user: UserAttributes = res.locals.user;
            const body: CreationClubAttributes = req.body;

            const { club, member } = await ClubHandler.createClub({
                user,
                clubPayload: body
            });

            res.status(201).json({ club, member });
        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }

    static async getClubsByUserId(req: Request, res: Response) {
        try {
            const { id }: UserAttributes = res.locals.user;

            const clubs = await ClubHandler.getClubsByUserId(id);

            res.status(200).json({ clubs });
        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }

    static async deleteClub(req: Request, res: Response) {
        try {
            const member: MemberAttributes = res.locals.member;
            const clubId = Number(req.params.clubId);

            const response = await ClubHandler.deleteClub({ clubId, member });

            if ('errorMessage' in response) {
                return res.status(403).json({ errorMessage: response.errorMessage });
            }

            res.status(200).json({ message: 'Club deleted successfully' });
        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }
}

export default ClubController;