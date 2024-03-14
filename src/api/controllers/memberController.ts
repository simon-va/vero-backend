import { NextFunction, Request, Response } from 'express';
import { ClubAttributes } from '../../types/club';
import { CreationMemberAttributes, MemberAttributes } from '../../types/member';
import MemberService from '../services/memberService';

class MemberController {
    static async getMembersByClubId(req: Request, res: Response, next: NextFunction) {
        const clubId: ClubAttributes['id'] = Number(req.params.clubId);

        try {
            const members = await MemberService.getMembersByClubId({ clubId });

            res.status(200).send(members);
        } catch (error) {
            next(error);
        }
    }

    static async createMember(req: Request, res: Response, next: NextFunction) {
        const clubId: ClubAttributes['id'] = Number(req.params.clubId);

        const payload: CreationMemberAttributes = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isAdmin: req.body.isAdmin || false,
            clubId,
            email: req.body.email || ''
        };

        try {
            const member = await MemberService.createMember({
                clubId,
                body: payload
            });

            res.status(201).send(member);
        } catch (error) {
            next(error);
        }
    }

    static async updateMember(req: Request, res: Response, next: NextFunction) {
        const memberId: MemberAttributes['id'] = Number(req.params.memberId);
        try {
            await MemberService.updateMember({
                id: memberId,
                ...req.body
            });

            res.send({ message: 'Member updated' });
        } catch (error) {
            next(error);
        }
    }

    static async deleteMember(req: Request, res: Response, next: NextFunction) {
        const clubId: ClubAttributes['id'] = Number(req.params.clubId);
        const memberId: MemberAttributes['id'] = Number(req.params.memberId);

        try {
            await MemberService.deleteMember({
                clubId,
                memberIdToDelete: memberId
            });

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default MemberController;