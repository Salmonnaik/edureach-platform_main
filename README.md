# EduReach Platform - Full Stack College Management System

A modern, responsive college management platform built with React, TypeScript, Node.js, and MongoDB. Features user authentication, course management, AI counselor chat, and real-time communication.

## 🚀 Features

### 🎓 **Core Functionality**
- **User Authentication**: Secure JWT-based login/registration system
- **Course Management**: Dynamic B.Tech, M.Tech, and MBA program listings
- **Chat System**: AI-powered counselor chat with intelligent responses
- **Call Scheduling**: AI counselor call booking system
- **Responsive Design**: Mobile-first design with modern UI
- **Real-time Updates**: Hot module replacement for development

### 🎨 **Modern UI/UX**
- **Hero Section**: Animated campus background with gradient overlays
- **Professional Navbar**: Sticky navigation with authentication states
- **Course Cards**: Modern card layouts with hover effects
- **Interactive Elements**: Smooth animations and micro-interactions
- **Color Scheme**: Professional blue/red gradient theme
- **Typography**: Clean font hierarchy with Playfair Display and DM Sans

### 🛠️ **Technical Stack**

#### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development and HMR
- **Tailwind CSS v4** for modern styling
- **Lucide React** for professional icons
- **Framer Motion** for smooth animations
- **React Router** for client-side routing
- **Axios** for API communication

#### **Backend**
- **Node.js 25** with TypeScript
- **Express.js** for REST API
- **MongoDB Atlas** for cloud database
- **Mongoose** for object modeling
- **JWT** for secure authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

## 📋 **Installation**

### Prerequisites
- Node.js 18+ 
- npm 9+
- MongoDB Atlas account (or local MongoDB)

### Setup Instructions

1. **Clone Repository**
   ```bash
   git clone https://github.com/Salmonnaik/edureach-platform-full-stack.git
   cd edureach-platform-full-stack
   ```

2. **Install Dependencies**
   ```bash
   # Frontend
   cd client
   npm install

   # Backend
   cd server
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment file
   cp server/.env.example server/.env

   # Update with your values
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edureach_db
   # JWT_SECRET=your-super-secret-jwt-key
   # CLIENT_URL=http://localhost:5173
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

## 🌐 **Access URLs**

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **API Documentation**: `http://localhost:5000/api/health`

## 📁 **Project Structure**

```
edureach-platform-full-stack/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layers
│   │   ├── styles/        # CSS and styling
│   │   └── data/          # Static content and configs
│   ├── public/              # Static assets
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite configuration
├── server/                # Node.js backend application
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # API routes
│   │   ├── models/         # Database models
│   │   ├── utils/          # Utility functions
│   │   ├── config/         # Configuration files
│   │   └── middleware/     # Express middleware
│   ├── .env.example          # Environment variables template
│   └── package.json          # Backend dependencies
└── README.md              # This file
```

## 🔐 **Security Features**

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **CORS Configuration**: Proper cross-origin request handling
- **Input Validation**: Server-side validation for all inputs
- **Environment Variables**: Secure configuration management

## 🎯 **API Endpoints**

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Chat System
- `POST /api/chat/send` - Send chat message
- `GET /api/chat/history` - Get chat history

### AI Counselor
- `POST /api/vapi/call` - Schedule AI counselor call

### Health Check
- `GET /api/health` - Server health status

## 📱 **Browser Support**

- **Chrome/Edge**: Full support with all features
- **Firefox**: Full support with all features
- **Safari**: Full support with all features
- **Mobile**: Responsive design for all screen sizes

## 🚀 **Development Scripts**

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:client": "cd client && npm run dev",
    "dev:server": "cd server && npm run dev",
    "build": "npm run build:client && npm run build:server",
    "build:client": "cd client && npm run build",
    "build:server": "cd server && npm run build"
  }
}
```

## 🎨 **Customization**

### Color Scheme
- **Primary**: `#1e40af` (Professional blue)
- **Secondary**: `#dc2626` (Vibrant red)
- **Accent**: `#f59e0b` (Warm amber)
- **Gradients**: Blue-to-red and amber-to-orange combinations

### Typography
- **Headings**: 'Playfair Display', serif
- **Body**: 'DM Sans', sans-serif
- **Code**: 'JetBrains Mono', monospace

## 🤖 **Performance**

- **Optimized Bundle**: Code splitting and lazy loading
- **Fast HMR**: Hot module replacement for rapid development
- **Efficient API**: Proper database indexing and caching
- **Smooth Animations**: 60fps CSS transitions

## 📞 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit changes: `git commit -m "Your feature description"`
5. Push to fork: `git push origin feature-name`
6. Create a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 **Support**

For support, questions, or contributions, please open an issue on the GitHub repository or contact the development team.

---

**EduReach Platform** - Empowering education through modern technology 🎓✨
