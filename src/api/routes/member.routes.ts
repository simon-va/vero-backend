import { Router } from 'express';
import MemberController from '../controllers/member.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import MemberMiddleware from '../middlewares/member.middleware';

const router = Router();

router.get('/:clubId/members', AuthMiddleware.verifyTokenWithMember, MemberController.getMembersByClubId);
router.post('/:clubId/members', AuthMiddleware.verifyTokenWithMember, MemberMiddleware.validateMemberCreation, MemberController.createMember);
router.patch('/:clubId/members/:memberId', AuthMiddleware.verifyTokenWithMember, MemberMiddleware.validateMemberUpdate, MemberController.updateMember);

export default router;