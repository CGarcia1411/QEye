import express from 'express';
import { getFirestore } from '../config/firebase.js';

const router = express.Router();

router.get('/', async (req, res) => {
  let firestoreStatus = 'disconnected';

  try {
    // Ping simple a Firestore
    await getFirestore().listCollections();
    firestoreStatus = 'connected';
  } catch {
    firestoreStatus = 'error';
  }

  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    firestore: firestoreStatus,
  });
});

export default router;
