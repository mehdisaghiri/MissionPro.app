import express from 'express';
import { sendMessage, getChatInfo } from '../controllers/chatController.js';

const router = express.Router();

// Chat routes
router.post('/chat', sendMessage);
router.get('/chat/info', getChatInfo);

export default router;
