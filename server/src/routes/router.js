import express from 'express';
import healthRouter from './health.js';
import authRoutes from './authRoutes.js';
import docsRoutes from './docsRoutes.js';

const router = express.Router();

router.use('/health', healthRouter);
router.use('/auth', authRoutes);
router.use('/docs', docsRoutes);

export default router;
