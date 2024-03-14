import { Request, Response } from 'express';
import { ClubAttributes } from '../../types/club';
import { CreationMemberAttributes, MemberAttributes } from '../../types/member';
import ClubRepository from '../../db/repositories/clubRepository';
import MemberRepository from '../../db/repositories/memberRepository';
import MemberService from '../services/memberService';

class MemberController {
    static async getMembersByClubId(req: Request, res: Response) {
        try {
            const clubId: ClubAttributes['id'] = res.locals.clubId;

            const members = await MemberService.getMembersByClubId({ clubId });

            res.status(200).json(members);
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
            email: req.body.email || ''
        };

        try {
            const member = await MemberService.createMember({
                clubId: res.locals.clubId,
                body: payload
            });

            res.status(201).json(member);
        } catch (error) {
            console.error(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }

    static async updateMember(req: Request, res: Response) {
        try {
            const member: MemberAttributes = res.locals.member;

            const response = await MemberService.updateMember({
                body: req.body,
                member
            });

            if (response && response.errorMessage) {
                return res.status(401).json({ errorMessage: response.errorMessage });
            }

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
            const memberId: MemberAttributes['id'] = Number(req.params.memberId);

            const response = await MemberService.deleteMember({
                clubId,
                member,
                memberIdToDelete: memberId
            });

            if (response && response.errorMessage) {
                return res.status(401).json({ errorMessage: response.errorMessage });
            }

            res.json({ message: response.message });
        } catch (error) {
            console.error(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }
}

export default MemberController;