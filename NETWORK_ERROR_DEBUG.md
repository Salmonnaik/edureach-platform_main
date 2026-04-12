# Network Error Debug Guide

## 🔍 **Common Network Error Causes**

### **1. CORS Issues**
- Backend allows wrong origin
- Frontend making requests to wrong port
- Missing credentials in CORS config

### **2. Backend Not Running**
- Server crashed
- Port conflict
- Database connection failed

### **3. API Endpoint Issues**
- Wrong URL in frontend
- Missing route in backend
- HTTP method mismatch

### **4. Firewall/Security**
- Antivirus blocking requests
- Windows Firewall
- Corporate network restrictions

## 🛠️ **Debug Steps**

### **Step 1: Check Browser Console**
1. Open browser dev tools (F12)
2. Go to Console tab
3. Try Google Sign-In
4. Look for specific error messages

### **Step 2: Check Network Tab**
1. Go to Network tab in dev tools
2. Clear network log
3. Try Google Sign-In
4. Check the failing request:
   - Request URL
   - Response code
   - Error message

### **Step 3: Test API Directly**
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test Google auth endpoint
curl -X POST http://localhost:5000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"idToken":"test","email":"test@test.com"}'
```

### **Step 4: Check Environment**
```bash
# Check what CLIENT_URL is actually set to
cd server && node -e "console.log(process.env.CLIENT_URL)"
```

## 🚨 **Likely Issues**

Based on setup, the most common issues are:

### **CORS Mismatch**
```
Expected: http://localhost:5173
Actual: http://localhost:5174 (from environment)
```

### **Port Conflict**
```
Frontend: 5173
Backend: 5000
Environment: CLIENT_URL=http://localhost:5174
```

### **Firebase Domain**
```
Firebase Console: localhost:5173 ✅
But still getting auth/unauthorized-domain
```

## 🔧 **Quick Fixes**

### **Fix 1: Update CLIENT_URL**
In your `.env` file, ensure:
```bash
CLIENT_URL=http://localhost:5173
```

### **Fix 2: Clear Browser Cache**
```
Chrome: Ctrl+Shift+Delete
Firefox: Ctrl+Shift+Del
```

### **Fix 3: Disable Extensions**
Temporarily disable:
- Ad blockers
- Privacy extensions
- Security plugins

### **Fix 4: Try Different Browser**
Test in:
- Chrome Incognito
- Firefox
- Edge

## 📞 **If Still Not Working**

1. **Check backend console** for environment variables
2. **Verify both servers** are running
3. **Test with curl** commands
4. **Check Windows Firewall** settings
5. **Restart both servers** completely

---

**Most likely fix**: Update CLIENT_URL in .env from `localhost:5174` to `localhost:5173`
