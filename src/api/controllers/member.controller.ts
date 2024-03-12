import { Request, Response } from 'express';
import Member from '../../db/models/member.model';
import MemberService from '../services/member.service';
import { ClubAttributes } from '../../db/models/club.model';
import { CreateMemberPayload } from '../../types/member';
import ClubService from '../services/club.service';

class MemberController {
    static async getMembersByClubId(req: Request, res: Response) {
        try {
            const clubId: ClubAttributes['id'] = res.locals.clubId;
            const members = await MemberService.getMembersByClubId(clubId);

            res.json(members);
        } catch (error) {
            console.error(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }

    static async createMember(req: Request, res: Response) {
        const payload: CreateMemberPayload = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isAdmin: req.body.isAdmin || false,
            clubId: res.locals.clubId
        };

        try {
            const member = await MemberService.createMember(payload);

            res.status(201).json(member);
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

    static async deleteMember(req: Request, res: Response) {
        try {
            const clubId: ClubAttributes['id'] = res.locals.clubId;
            const member: Member = res.locals.member;

            if (!member.isAdmin) {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }

            const memberId: Member['id'] = Number(req.params.memberId);

            if (!memberId) {
                return res.status(400).json({ errorMessage: 'Provide a memberId in params' });
            }

            // If the member is the only admin, delete the club
            // The requesting user will always be the last admin in this case
            const members = await MemberService.getMembersByClubId(clubId);

            if (members.length === 1 && members[0].isAdmin === member.isAdmin) {
                await ClubService.deleteClub(clubId);

                return res.json({ message: 'Club deleted' });
            }

            await MemberService.deleteMember(memberId);

            res.json({ message: 'Member deleted' });
        } catch (error) {
            console.error(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }
}

export default MemberController;