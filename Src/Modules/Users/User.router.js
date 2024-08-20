import { Router } from "express";
import * as UserController from './User.controller.js'
import { auth } from "../../Middelware/Auth.js";
const router = Router();


router.get('/',UserController.getAllUsers);

export default router;