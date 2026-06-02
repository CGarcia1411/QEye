import admin from 'firebase-admin';
import { createRequire } from 'module';
import config from './environment.js';
import fs from 'fs';

const initializeFirebase = () => {
  if (admin.apps.length > 0) return; 

  let credential;

  if (config.firebase.serviceAccountPath && fs.existsSync(config.firebase.serviceAccountPath)) {
    // Opción 1: archivo de service account JSON
    const require = createRequire(import.meta.url);
    const serviceAccount = require(config.firebase.serviceAccountPath);
    credential = admin.credential.cert(serviceAccount);
  } else if (config.firebase.projectId && config.firebase.clientEmail && config.firebase.privateKey) {
    // Opción 2: variables de entorno individuales
    credential = admin.credential.cert({
      projectId: config.firebase.projectId,
      clientEmail: config.firebase.clientEmail,
      privateKey: config.firebase.privateKey,
    });
  } else {
    throw new Error(
      'Firebase credentials not configured. ' +
      'Set FIREBASE_SERVICE_ACCOUNT_PATH or ' +
      'FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY in .env'
    );
  }

  admin.initializeApp({ credential });
  console.log('Firebase Admin initialized successfully');
};

export const getFirestore = () => admin.firestore();
export const getAuth = () => admin.auth();
export const getStorage = () => admin.storage();

export { admin };
export default initializeFirebase;
