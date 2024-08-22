import { Router } from "express";
import * as UserController from './User.controller.js'
import { asyncHandler } from "../../Utilities/CatchError.js";
const router = Router();

router.get('/', asyncHandler(UserController.getAllUsers));

export default router;