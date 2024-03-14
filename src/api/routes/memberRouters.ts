import { Router } from 'express';
import MemberController from '../controllers/memberController';
import { ParamValue, validateBody, validateParams } from '../middlewares/validate';
import { auth, AuthType } from '../middlewares/auth';

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
        type: 'email'
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
        type: 'email'
    },
    isAdmin: {
        optional: true,
        type: 'boolean'
    }
};

router.get('/:clubId/members', validateParams([ParamValue.ClubId]), auth(), MemberController.getMembersByClubId);
router.post('/:clubId/members', validateParams([ParamValue.ClubId]), validateBody(createMemberBodySchema), auth([AuthType.IsAdmin]), MemberController.createMember);
router.patch('/:clubId/members/:memberId', validateParams([ParamValue.ClubId, ParamValue.MemberId]), validateBody(updateMemberSchema), auth([AuthType.IsAdmin]), MemberController.updateMember);
router.delete('/:clubId/members/:memberId', validateParams([ParamValue.ClubId, ParamValue.MemberId]), auth([AuthType.IsAdmin]), MemberController.deleteMember);

export default router;