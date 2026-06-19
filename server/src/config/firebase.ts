import admin from "firebase-admin";
import { readFileSync } from "fs";

// Firebase Admin SDK configuration
let serviceAccount;

try {
  // Try to read from environment variable first (for production)
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (serviceAccountPath) {
    serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    // Try to parse from environment variable
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  } else {
    // Fallback to hardcoded config (for development)
    serviceAccount = {
      "type": "service_account",
      "project_id": "edureach-collage",
      "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID || "YOUR_PRIVATE_KEY_ID",
      "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || "YOUR_PRIVATE_KEY",
      "client_email": process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-xxxxx@edureach-collage.iam.gserviceaccount.com",
      "client_id": process.env.FIREBASE_CLIENT_ID || "YOUR_CLIENT_ID",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token"
    };
  }
} catch (error) {
  console.warn("Firebase Admin SDK: Could not load service account credentials. Running in development mode.");
  serviceAccount = {
    "type": "service_account",
    "project_id": "edureach-collage",
    "private_key_id": "YOUR_PRIVATE_KEY_ID",
    "private_key": "YOUR_PRIVATE_KEY",
    "client_email": "firebase-adminsdk-xxxxx@edureach-collage.iam.gserviceaccount.com",
    "client_id": "YOUR_CLIENT_ID",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token"
  };
}

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    // For development, skip Firebase Admin SDK if no real credentials
    if (serviceAccount.private_key && serviceAccount.private_key !== "YOUR_PRIVATE_KEY") {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any),
      });
      console.log("Firebase Admin SDK initialized successfully");
    } else {
      console.log("Firebase Admin SDK: Skipping initialization in development mode (no credentials provided)");
    }
  } catch (error) {
    console.error("Firebase Admin SDK initialization failed:", error);
  }
}

export const auth: admin.auth.Auth | null = admin.apps.length > 0 ? admin.auth() : null;
export default admin;
