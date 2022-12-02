import express from 'express';

import { UserController } from '../controllers/user.auth.controller';
import { deserializeUser } from '../middlewares/deserializeUser';
import { requireUser } from '../middlewares/requireUser';
import { validate } from '../middlewares/validate';
import { createUserSchema } from '../schemas/user.schema';

const router = express.Router();

const userController = new UserController()

router.post('/users', validate(createUserSchema), userController.registerUserHandler);

router.post('/login', userController.loginUserHandler);

router.get('/logout', deserializeUser, requireUser, userController.logoutHandler);

export default router;
