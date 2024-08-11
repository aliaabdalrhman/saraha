import { Router } from "express";
import * as authController from './Auth.controller.js'
const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;