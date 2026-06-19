// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAzsTFrpSZ1QkV-5uVo3C5fOH6Utg-IfQ",
  authDomain: "edureach-collage.firebaseapp.com",
  projectId: "edureach-collage",
  storageBucket: "edureach-collage.firebasestorage.app",
  messagingSenderId: "604240327572",
  appId: "1:604240327572:web:45c4e48ec1fb0fd9c8d581",
  measurementId: "G-HT8SH0ST3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Configure Google Provider for better user experience
const baseParams = {
  prompt: 'select_account', // Force account selection
  access_type: 'offline'   // Request refresh token
};

googleProvider.setCustomParameters(baseParams);

// Add development domain handling
if (window.location.hostname === 'localhost') {
  googleProvider.setCustomParameters({
    ...baseParams,
    // Force localhost for development
    hd: 'localhost'
  });
}

// Google Sign-In function
export const signInWithGoogle = async () => {
  try {
    console.log("Initializing Firebase Google Sign-In...");
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Firebase popup result:", user);
    
    // Get the ID token for backend verification
    const idToken = await user.getIdToken();
    console.log("Got ID token:", idToken.substring(0, 20) + "...");
    
    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      idToken
    };
  } catch (error: any) {
    console.error("Firebase Google Sign-In error:", error);
    
    // Handle specific error cases
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error("Sign-in popup was closed before completion");
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error("Sign-in popup was blocked by the browser");
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error("Sign-in was cancelled");
    } else {
      throw new Error(error.message || "Google sign-in failed");
    }
  }
};

// Sign out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error: any) {
    console.error("Firebase sign out error:", error);
    throw new Error(error.message || "Sign out failed");
  }
};

// Get current user function
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChanged = (callback: (user: any) => void) => {
  return auth.onAuthStateChanged(callback);
};

export { auth, app, analytics };
