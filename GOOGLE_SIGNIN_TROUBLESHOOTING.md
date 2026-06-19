# Google Sign-In Troubleshooting Guide

## 🔍 **Common Issues & Solutions**

### **1. Firebase Configuration Issues**

#### **Check Firebase Console Settings:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `edureach-collage`
3. Navigate to **Authentication** → **Sign-in method**
4. Ensure **Google** is **ENABLED**
5. Check **Authorized domains** include:
   - `localhost` (for development)
   - `localhost:5173` (specific port)
   - `127.0.0.1` (alternative localhost)

#### **OAuth Consent Screen:**
1. Go to **Authentication** → **Sign-in method** → **Google**
2. Click on **Configure** 
3. Verify **OAuth consent screen** is properly configured
4. Ensure app has required permissions

### **2. Browser Console Errors**

Open browser console (F12) and check for:

#### **Firebase Errors:**
```
auth/popup-closed-by-user
auth/popup-blocked  
auth/cancelled-popup-request
auth/network-request-failed
```

#### **CORS Errors:**
```
Access to fetch at '...' has been blocked by CORS policy
```

#### **Firebase SDK Errors:**
```
Firebase: No Firebase App '[DEFAULT]' has been created
Firebase: Firebase App named '[DEFAULT]' already exists
```

### **3. Development Server Issues**

#### **Check if servers are running:**
```bash
# Backend
curl http://localhost:5000/api/health

# Frontend  
curl http://localhost:5173
```

#### **Port conflicts:**
- Frontend: 5173
- Backend: 5000
- Ensure no other apps using these ports

### **4. Firebase Service Account Issues**

#### **Backend Configuration:**
1. Get service account key from Firebase Console
2. Place in `server/firebase-service-account.json`
3. Or add to `server/.env`:
```bash
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@edureach-collage.iam.gserviceaccount.com"
```

### **5. Testing Steps**

#### **Step 1: Test Firebase Configuration**
```javascript
// In browser console
import { signInWithGoogle } from './config/firebase';
signInWithGoogle().then(console.log).catch(console.error);
```

#### **Step 2: Test Backend API**
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test Google auth endpoint (with real token)
curl -X POST http://localhost:5000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"idToken":"test","email":"test@test.com"}'
```

### **6. Quick Debug Checklist**

- [ ] Firebase project ID matches: `edureach-collage`
- [ ] Google provider is enabled in Firebase Console
- [ ] Authorized domains include localhost
- [ ] Frontend running on port 5173
- [ ] Backend running on port 5000
- [ ] No browser popup blockers
- [ ] Console shows no Firebase initialization errors
- [ ] Network tab shows successful API calls

### **7. Common Error Messages**

#### **"popup-blocked"**
- Disable popup blocker for localhost
- Try different browser
- Check browser security settings

#### **"Invalid Firebase token"**
- Check backend Firebase Admin SDK configuration
- Verify service account credentials
- Ensure Firebase project matches

#### **"Network request failed"**
- Check internet connection
- Verify Firebase API key is valid
- Check CORS configuration

### **8. Browser Compatibility**

**Recommended Browsers:**
- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

**Known Issues:**
- Safari may block popups by default
- Firefox strict mode may block Firebase
- Incognito mode may cause issues

---

## 🚀 **If Still Not Working**

1. **Check browser console** for specific error messages
2. **Verify Firebase Console** settings
3. **Test with different browser**
4. **Clear browser cache and cookies**
5. **Restart development servers**

**Last Resort:** Temporarily disable Firebase verification in backend for testing.
