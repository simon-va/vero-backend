import { Router } from 'express';
import UserController from '../controllers/userController';
import { validateBody } from '../middlewares/validate';

const router = Router();

const registerUserBodySchema = {
    firstName: {
        required: true,
        type: 'string'
    },
    lastName: {
        required: true,
        type: 'string'
    },
    email: {
        required: true,
        type: 'email'
    },
    password: {
        required: true,
        type: 'string'
    }
};
const loginUserBodySchema = {
    email: {
        required: true,
        type: 'email'
    },
    password: {
        required: true,
        type: 'string'
    }
};

router.post('/register', validateBody(registerUserBodySchema), UserController.registerUser);
router.post('/login', validateBody(loginUserBodySchema), UserController.loginUser);

export default router;