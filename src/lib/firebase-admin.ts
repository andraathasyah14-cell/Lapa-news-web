
import admin, { App } from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

// Ensure all necessary environment variables are present
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    // In a real production environment, you might throw an error.
    // For development, a clear warning is helpful.
    console.warn(`WARNING: Firebase environment variable ${envVar} is not set.`);
  }
}

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

/**
 * Ensures Firebase Admin is initialized only once (singleton pattern).
 * @returns The initialized Firebase Admin app.
 */
function initializeAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  try {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    return app;
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error.stack);
    // Throw the error to make it clear that initialization failed.
    throw new Error('Firebase admin initialization failed: ' + error.message);
  }
}

// Initialize the app
const adminApp = initializeAdminApp();

// Export the firestore instance and the admin app itself
export const db = admin.firestore();
export { adminApp as admin };
