import { Router } from "express";
import * as MessageController from './Messgae.controller.js'
import validation from "../../Middelware/validation.js";
import { sendMessageSchema } from "./Message.validation.js";

const router = Router();

router.post('/:receiverId', validation(sendMessageSchema), MessageController.sendMessage);
router.get('/', MessageController.getMessage);

export default router;
