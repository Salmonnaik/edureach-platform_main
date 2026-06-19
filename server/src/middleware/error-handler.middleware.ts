import type { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);
  
  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: err.message || "Validation failed",
      error: err,
    });
    return;
  }

  // Handle Mongoose duplicate key errors
  if (err.name === "MongoServerError" && (err as any).code === 11000) {
    res.status(409).json({
      success: false,
      message: "Email already exists",
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
};

export default errorHandler;