import API from "./api";
import { signInWithGoogle } from "../config/firebase";

export const registerUser = async (data: {
  name: string; email: string; password: string; phone?: string;
}) => {
  const res = await API.post("/auth/register", data);
  return res.data.data; // { token, user }
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await API.post("/auth/login", data);
  return res.data.data; // { token, user }
};

export const loginWithGoogle = async () => {
  try {
    console.log("Starting Firebase Google Sign-In...");
    const { user, idToken } = await signInWithGoogle();
    console.log("Firebase auth successful, user:", user);
    
    // Send the ID token to your backend for verification
    console.log("Sending to backend...");
    const res = await API.post("/auth/google", {
      idToken,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
    });
    console.log("Backend response:", res.data);
    
    return res.data.data; // { token, user }
  } catch (error: any) {
    console.error("Google login error:", error);
    throw new Error(error.message || "Google login failed");
  }
};

export const getMe = async () => {
  const res = await API.get("/auth/me");
  return res.data.data; // { user }
};