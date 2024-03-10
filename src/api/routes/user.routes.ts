import {Router} from "express";
import {postUser} from "../controllers/user.controller";

const router = Router();

router.post('/register', postUser);

export default router;