// Debug CORS configuration
console.log('=== CORS Debug ===');
console.log('CLIENT_URL from env:', process.env.CLIENT_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

import express from 'express';
import cors from 'cors';

const app = express();

// Test CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get('/api/test-cors', (req, res) => {
  res.json({ 
    success: true, 
    message: "CORS test successful",
    origin: req.headers.origin,
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173"
  });
});

app.listen(5001, () => {
  console.log('CORS test server running on port 5001');
});
