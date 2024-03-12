import { Request, Response } from 'express';
import Member from '../../db/models/member.model';
import MemberService from '../services/member.service';
import { ClubAttributes } from '../../db/models/club.model';

class MemberController {
    static async getMembersByClubId(req: Request, res: Response) {
        try {
            const clubId: ClubAttributes['id'] = res.locals.clubId
            const members = await MemberService.getMembersByClubId(clubId);

            res.json(members);
        } catch (error) {
            console.error(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }
    static async updateMember(req: Request, res: Response) {
        try {
            const member: Member = res.locals.member;

            if (!member.isAdmin) {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }

            await MemberService.updateMember({ id: member.id, ...req.body });

            res.json({ message: 'Member updated' });
        } catch (error) {
            console.error(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }
}

export default MemberController;