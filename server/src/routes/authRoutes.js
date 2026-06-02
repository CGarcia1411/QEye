import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// TODO: implementar controladores de auth
// router.post('/login', authController.login);
// router.post('/logout', authController.logout);
// router.get('/verify', verifyToken, authController.verifyAuth);

router.get('/ping', (req, res) => {
  res.json({ success: true, message: 'auth route ok' });
});

export default router;
