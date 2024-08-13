import { Router } from "express";
import * as authController from './Auth.controller.js'
import validation from "../../Middelware/validation.js";
import { loginSchema, registerSchema } from "./Auth.validation.js";

const router = Router();

router.post('/register', validation(registerSchema), authController.register);
router.post('/login', validation(loginSchema), authController.login);

export default router;