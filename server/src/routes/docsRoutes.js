import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// TODO: implementar controladores de docs
// router.get('/', verifyToken, docsController.getAll);
// router.post('/', verifyToken, docsController.create);
// router.get('/:id', verifyToken, docsController.getById);
// router.put('/:id', verifyToken, docsController.update);
// router.delete('/:id', verifyToken, docsController.delete);

router.get('/ping', (req, res) => {
  res.json({ success: true, message: 'docs route ok' });
});

export default router;
