// Debug Firebase configuration
import { signInWithGoogle } from "./config/firebase";

// Test function to debug Google Sign-In
export const testGoogleSignIn = async () => {
  console.log("=== Firebase Debug Test ===");
  
  try {
    console.log("1. Starting Google Sign-In test...");
    const result = await signInWithGoogle();
    console.log("2. Firebase Sign-In successful:", result);
    return result;
  } catch (error: any) {
    console.error("3. Firebase Sign-In failed:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    throw error;
  }
};
