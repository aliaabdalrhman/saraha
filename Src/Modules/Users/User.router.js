import { Router } from "express";
import * as UserController from './User.controller.js'
import { asyncHandler } from "../../Utilities/CatchError.js";
import fileUpload from "../../Utilities/Multer.js";
import { auth } from "../../Middelware/Auth.js";
const router = Router();

router.get('/', asyncHandler(UserController.getAllUsers));
router.put('/uploadImage', fileUpload().single('image'), asyncHandler(auth), asyncHandler(UserController.uploadImage));
export default router;