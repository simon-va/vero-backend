import { Request, Response } from 'express';
import { CreationClubAttributes } from '../../types/club';
import { UserAttributes } from '../../types/user';
import { MemberAttributes } from '../../types/member';
import UserRepository from '../../db/repositories/user.repository';
import ClubRepository from '../../db/repositories/club.repository';
import MemberRepository from '../../db/repositories/member.repository';

class ClubController {
    static async createClub(req: Request, res: Response) {
        try {
            const user: UserAttributes = res.locals.user;

            const body: CreationClubAttributes = req.body;

            const club = await ClubRepository.createClub(body);

            const member = await MemberRepository.createMember({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                clubId: club.id,
                isAdmin: true,
                ...body
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

            const clubs = await UserRepository.getClubsByUserId(id);

            res.status(200).json({ clubs });
        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }

    static async deleteClub(req: Request, res: Response) {
        try {
            const member: MemberAttributes = res.locals.member;

            if (!member.isAdmin) {
                res.status(401).json({ errorMessage: 'You are not authorized to delete this club' });
            }

            const clubId = Number(req.params.clubId);

            await ClubRepository.deleteClub(clubId);

            res.status(200).json({ message: 'Club deleted successfully' });
        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }
}

export default ClubController;