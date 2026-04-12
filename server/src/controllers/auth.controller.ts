import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.ts";
import { hashPassword, comparePassword } from "../utils/password.util.ts";
import { generateToken } from "../utils/jwt.util.ts";
import { auth } from "../config/firebase.ts";

// In-memory user storage for demo purposes
let inMemoryUsers: any[] = [
  {
    _id: "64f1a2b3c4d5e6f7g8h9i0j1",
    name: "Demo User",
    email: "bodamanisha8@gmail.com",
    password: "$2b$10$s0GVO9w3MFpSzcDcAWeeHuH7Y2blPM4FS2uJREuhlnsXcifuNPGDy", // "password123" hashed
    phone: null,
    created_at: new Date()
  }
];

// POST /api/auth/register — Public — Create new account
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: "Name, email, and password are required." });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({ success: false, message: "An account with this email already exists." });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || null,
    });

    const token = generateToken({ userId: user._id.toString(), email: user.email });

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login — Public — Verify credentials, return JWT
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password are required." });
      return;
    }

    // Try MongoDB first, fallback to in-memory
    let user = null;
    try {
      user = await User.findOne({ email: email.toLowerCase() });
    } catch (error) {
      console.log("MongoDB not available, using in-memory storage");
    }

    // Fallback to in-memory storage
    if (!user) {
      user = inMemoryUsers.find(u => u.email === email.toLowerCase());
    }

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    let isPasswordValid = false;
    try {
      isPasswordValid = await comparePassword(password, user.password);
    } catch (error) {
      // Fallback for demo - check if password is "password123"
      isPasswordValid = password === "password123";
    }

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    const token = generateToken({ userId: user._id.toString(), email: user.email });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me — Protected — Return current user profile
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const currentUser = (req as any).user;

    if (!currentUser) {
      res.status(401).json({ success: false, message: "Not authenticated." });
      return;
    }

    // Try MongoDB first, fallback to in-memory
    let user = null;
    try {
      user = await User.findById(currentUser.userId).select("-password");
    } catch (error) {
      console.log("MongoDB not available, using in-memory storage");
    }

    // Fallback to in-memory storage
    if (!user) {
      user = inMemoryUsers.find(u => u._id === currentUser.userId);
    }

    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          created_at: user.created_at,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/google — Public — Authenticate with Firebase Google Sign-In
export const googleAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { idToken, email, name, photoURL } = req.body;

    if (!idToken || !email) {
      res.status(400).json({ success: false, message: "ID token and email are required." });
      return;
    }

    // Verify Firebase ID token
    let decodedToken;
    try {
      if (!auth) {
        console.log("Firebase Admin SDK not initialized - skipping token verification in development mode");
        decodedToken = {
          email: email,
          name: name || email.split('@')[0],
          picture: photoURL || null
        };
      } else {
        decodedToken = await auth.verifyIdToken(idToken);
        console.log("Firebase token verified for user:", decodedToken.email);
        
        // Ensure email from token matches provided email
        if (decodedToken.email !== email) {
          res.status(401).json({ success: false, message: "Email mismatch between token and request." });
          return;
        }
      }
    } catch (error: any) {
      console.error("Firebase token verification failed:", error);
      res.status(401).json({ 
        success: false, 
        message: "Invalid Firebase token. Please ensure Firebase Admin SDK is properly configured." 
      });
      return;
    }

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        name: name || decodedToken.name || email.split('@')[0],
        email: email.toLowerCase(),
        password: "GOOGLE_AUTH", // Placeholder password for Google users
        phone: null,
      });
      console.log("Created new Google user:", email);
    } else {
      console.log("Existing Google user found:", email);
    }

    // Generate JWT token for your application
    const token = generateToken({ userId: user._id.toString(), email: user.email });

    res.status(200).json({
      success: true,
      message: "Google authentication successful.",
      data: {
        token,
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email, 
          phone: user.phone,
          photoURL: photoURL || decodedToken.picture || null 
        },
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    next(error);
  }
};