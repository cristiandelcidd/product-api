import { Router } from 'express';
const router = Router();
import { authJwt, verifySignup } from '../middlewares'

import * as userCtrl from '../controllers/user.controller';

router.post(
    '/',
    [ authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted ],
    userCtrl.createUser
);

export default router;