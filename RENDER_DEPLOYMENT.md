# Render Deployment Guide

## Quick Setup for EduReach Backend

### 1. Go to Render
- URL: https://render.com
- Sign up with GitHub

### 2. Create Web Service
- Click "New" -> "Web Service"
- Connect your GitHub repo: `Salmonnaik/edureach-platform_main`

### 3. Configure Service
```
Name: edureach-backend
Root Directory: server
Environment: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### 4. Environment Variables
Add these in the Environment section:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=https://your-frontend-url.vercel.app
```

### 5. Deploy
Click "Create Web Service" and wait for deployment.

### 6. Test Your Backend
Once deployed, test: `YOUR_BACKEND_URL/api/health`

### 7. Update Frontend
Update your frontend API base URL to your new Render backend URL.

## Important Notes
- Free tier sleeps after 15 minutes of inactivity
- MongoDB Atlas recommended for database
- SSL certificates are included
- Auto-deploys on git push
