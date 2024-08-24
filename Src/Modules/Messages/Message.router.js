import { Router } from "express";
import * as MessageController from './Messgae.controller.js'
import validation from "../../Middelware/validation.js";
import { sendMessageSchema } from "./Message.validation.js";
import { auth } from "../../Middelware/Auth.js";
import { asyncHandler } from "../../Utilities/CatchError.js";

const router = Router();

router.post('/:receiverId', asyncHandler(validation(sendMessageSchema)), asyncHandler(MessageController.sendMessage));
router.get('/', asyncHandler(auth), asyncHandler(MessageController.getMessages));

export default router;
