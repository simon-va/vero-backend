import { Router } from 'express';
import MemberController from '../controllers/memberController';
import { auth, AuthType } from '../middlewares/auth';
import {
    ParamValue,
    validateBody,
    validateParams
} from '../middlewares/validate';

const router = Router();

const createMemberBodySchema = {
    firstName: {
        required: true,
        type: 'string'
    },
    lastName: {
        required: true,
        type: 'string'
    },
    email: {
        optional: true,
        type: 'string'
    },
    isAdmin: {
        optional: true,
        type: 'boolean'
    }
};
const updateMemberSchema = {
    firstName: {
        optional: true,
        type: 'string'
    },
    lastName: {
        optional: true,
        type: 'string'
    },
    email: {
        optional: true,
        type: 'string'
    },
    isAdmin: {
        optional: true,
        type: 'boolean'
    },
    birthDate: {
        optional: true,
        type: 'string'
    },
    phone: {
        optional: true,
        type: 'string'
    },
    address: {
        optional: true,
        type: 'string'
    },
    city: {
        optional: true,
        type: 'string'
    },
    zipCode: {
        optional: true,
        type: 'string'
    },
    gender: {
        optional: true,
        type: 'number'
    },
    $$strict: true
};

const assignUserToMemberSchema = {
    email: {
        required: true,
        type: 'email'
    }
};

router.get(
    '/:clubId/members',
    validateParams([ParamValue.ClubId]),
    auth(),
    MemberController.getMembersByClubId
);

router.post(
    '/:clubId/members',
    validateParams([ParamValue.ClubId]),
    validateBody(createMemberBodySchema),
    auth([AuthType.IsManager]),
    MemberController.createMember
);

router.post(
    '/:clubId/members/:memberId/user',
    validateParams([ParamValue.ClubId, ParamValue.MemberId]),
    validateBody(assignUserToMemberSchema),
    auth([AuthType.IsManager]),
    MemberController.assignUserToMember
);

router.patch(
    '/:clubId/members/:memberId',
    validateParams([ParamValue.ClubId, ParamValue.MemberId]),
    validateBody(updateMemberSchema),
    auth([AuthType.IsManager]),
    MemberController.updateMember
);

router.delete(
    '/:clubId/members/:memberId',
    validateParams([ParamValue.ClubId, ParamValue.MemberId]),
    auth([AuthType.IsManager]),
    MemberController.deleteMember
);

router.delete(
    '/:clubId/members/:memberId/user',
    validateParams([ParamValue.ClubId, ParamValue.MemberId]),
    auth([AuthType.IsManager]),
    MemberController.removeUserFromMember
);

export default router;
