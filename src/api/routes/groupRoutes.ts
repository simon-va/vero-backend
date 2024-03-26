import { Router } from 'express';
import GroupController from '../controllers/groupController';
import { auth, AuthType } from '../middlewares/auth';
import {
    ParamValue,
    validateBody,
    validateParams
} from '../middlewares/validate';

const router = Router();

const createGroupSchema = {
    name: {
        required: true,
        type: 'string'
    }
};

router.get(
    '/:clubId/groups',
    validateParams([ParamValue.ClubId]),
    auth([]),
    GroupController.getGroupsWithMembers
);

router.post(
    '/:clubId/groups',
    validateParams([ParamValue.ClubId]),
    validateBody(createGroupSchema),
    auth([AuthType.IsManager]),
    GroupController.createGroup
);

router.post(
    '/:clubId/groups/:groupId/members/:memberId',
    validateParams([
        ParamValue.ClubId,
        ParamValue.GroupId,
        ParamValue.MemberId
    ]),
    auth([AuthType.IsManager]),
    GroupController.addMemberToGroup
);

router.delete(
    '/:clubId/group/:groupId/members/:memberId',
    validateParams([
        ParamValue.ClubId,
        ParamValue.GroupId,
        ParamValue.MemberId
    ]),
    auth([AuthType.IsManager]),
    GroupController.removeMemberFromGroup
);

router.delete(
    '/:clubId/groups/:groupId',
    validateParams([ParamValue.ClubId, ParamValue.GroupId]),
    auth([AuthType.IsManager]),
    GroupController.deleteGroup
);

export default router;
