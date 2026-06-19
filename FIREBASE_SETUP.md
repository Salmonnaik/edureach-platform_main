# Firebase Setup Guide for Google Sign-In

This guide will help you set up Firebase for secure Google Sign-In authentication in your EduReach platform.

## 🔧 **Step 1: Get Firebase Service Account Key**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `edureach-collage`
3. Click on **⚙️ Settings** → **Service accounts**
4. Click **"Generate new private key"**
5. Save the JSON file as `firebase-service-account.json` in the `server/` directory

## 📋 **Step 2: Configure Environment Variables**

### Option A: Using Service Account File (Recommended for Development)
```bash
# Copy the service account file to server directory
cp firebase-service-account.json server/

# Add to server/.env
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
```

### Option B: Using Environment Variables (Recommended for Production)
```bash
# Add these to your server/.env file
FIREBASE_PRIVATE_KEY_ID="your_private_key_id_from_json"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@edureach-collage.iam.gserviceaccount.com"
FIREBASE_CLIENT_ID="your_client_id_from_json"
```

### Option C: Using JSON String (For Deployment Platforms)
```bash
# Add the entire JSON as a single environment variable
FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"edureach-collage",...}'
```

## 🚀 **Step 3: Enable Google Sign-In in Firebase**

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Google** provider
3. Add your authorized domains:
   - `http://localhost:5173` (development)
   - `https://your-production-domain.com` (production)

## ✅ **Step 4: Verify Setup**

Once configured, the system will:
- ✅ Verify Firebase ID tokens on the backend
- ✅ Prevent token tampering and replay attacks
- ✅ Automatically create user accounts for new Google users
- ✅ Handle profile pictures and user data from Google

## 🔒 **Security Features**

- **Token Verification**: Backend verifies every Firebase token
- **Email Matching**: Ensures token email matches request email
- **Secure Storage**: Service account keys stored securely
- **Error Handling**: Clear error messages for debugging

## 🧪 **Testing**

1. Start the development servers:
   ```bash
   # Terminal 1 - Backend
   cd server && npm run dev
   
   # Terminal 2 - Frontend
   cd client && npm run dev
   ```

2. Navigate to `http://localhost:5173`
3. Click "Continue with Google"
4. Complete Google authentication
5. Check console logs for verification success

## 🚨 **Troubleshooting**

### Common Issues:
1. **"Invalid Firebase token"**: Check service account configuration
2. **"Email mismatch"**: Ensure frontend sends correct email
3. **"Private key format"**: Make sure newlines are properly escaped

### Debug Commands:
```bash
# Check Firebase Admin initialization
cd server && node -e "import('./src/config/firebase.ts').then(m => console.log('Firebase initialized:', !!m.default.apps.length))"

# Test token verification (requires valid token)
# Use browser dev tools to get an ID token after Google Sign-In
```

## 📱 **Production Deployment**

For production deployment:
1. Use environment variables (Option B or C)
2. Add your production domain to Firebase authorized domains
3. Ensure HTTPS is enabled
4. Set up proper CORS configuration

---

**Note**: The system will work in development mode even without proper Firebase credentials, but tokens won't be verified. Always configure proper credentials for production use.
