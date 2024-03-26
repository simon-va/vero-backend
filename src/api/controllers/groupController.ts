import { NextFunction, Request, Response } from 'express';
import Club from '../../db/models/club';
import Group from '../../db/models/group';
import Member from '../../db/models/member';
import { CreationGroupAttributes } from '../../types/group';
import GroupService from '../services/groupService';

class GroupController {
    static async createGroup(req: Request, res: Response, next: NextFunction) {
        const clubId: Club['id'] = Number(req.params.clubId);
        const body: CreationGroupAttributes = req.body;

        try {
            const group = await GroupService.createGroup({
                clubId,
                groupPayload: {
                    ...body
                }
            });

            res.status(201).send(group);
        } catch (error) {
            next(error);
        }
    }

    static async addMemberToGroup(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const groupId: Group['id'] = Number(req.params.groupId);
        const memberId: Member['id'] = Number(req.params.memberId);
        const clubId: Club['id'] = Number(req.params.clubId);

        try {
            await GroupService.addMemberToGroup({
                groupId,
                memberId,
                clubId
            });

            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    static async removeMemberFromGroup(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const groupId: Group['id'] = Number(req.params.groupId);
        const memberId: Member['id'] = Number(req.params.memberId);
        const clubId: Club['id'] = Number(req.params.clubId);

        try {
            await GroupService.removeMemberFromGroup({
                groupId,
                memberId,
                clubId
            });

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    static async getGroupsWithMembers(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const clubId: Club['id'] = Number(req.params.clubId);

        try {
            const groups = await GroupService.getGroupsWithMembers(clubId);

            res.status(200).send(groups);
        } catch (error) {
            next(error);
        }
    }

    static async deleteGroup(req: Request, res: Response, next: NextFunction) {
        const groupId: Group['id'] = Number(req.params.groupId);
        const clubId: Club['id'] = Number(req.params.clubId);

        try {
            await GroupService.deleteGroup({
                groupId,
                clubId
            });

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default GroupController;
