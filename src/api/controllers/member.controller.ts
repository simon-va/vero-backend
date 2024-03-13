import { Request, Response } from 'express';
import { ClubAttributes } from '../../types/club';
import { CreationMemberAttributes, MemberAttributes } from '../../types/member';
import ClubRepository from '../../db/repositories/club.repository';
import MemberRepository from '../../db/repositories/member.repository';

class MemberController {
    static async getMembersByClubId(req: Request, res: Response) {
        try {
            const clubId: ClubAttributes['id'] = res.locals.clubId;

            const members = await MemberRepository.getMembersByClubId(clubId);

            res.json(members);
        } catch (error) {
            console.error(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }

    static async createMember(req: Request, res: Response) {
        const payload: CreationMemberAttributes = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isAdmin: req.body.isAdmin || false,
            clubId: res.locals.clubId,
            email: req.body.email || '',
        };

        try {
            const member = await MemberRepository.createMember(payload);

            res.status(201).json(member);
        } catch (error) {
            console.error(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }

    static async updateMember(req: Request, res: Response) {
        try {
            const member: MemberAttributes = res.locals.member;

            if (!member.isAdmin) {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }

            await MemberRepository.updateMember({ id: member.id, ...req.body });

            res.json({ message: 'Member updated' });
        } catch (error) {
            console.error(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }

    static async deleteMember(req: Request, res: Response) {
        try {
            const clubId: ClubAttributes['id'] = res.locals.clubId;
            const member: MemberAttributes = res.locals.member;

            if (!member.isAdmin) {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }

            const memberId: MemberAttributes['id'] = Number(req.params.memberId);

            if (!memberId) {
                return res.status(400).json({ errorMessage: 'Provide a memberId in params' });
            }

            // If the member is the only admin, delete the club
            // The requesting user will always be the last admin in this case
            const members = await MemberRepository.getMembersByClubId(clubId);

            if (members.length === 1 && members[0].isAdmin === member.isAdmin) {
                await ClubRepository.deleteClub(clubId);

                return res.json({ message: 'Club deleted' });
            }

            await MemberRepository.deleteMember(memberId);

            res.json({ message: 'Member deleted' });
        } catch (error) {
            console.error(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }
}

export default MemberController;