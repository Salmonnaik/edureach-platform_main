// Mock auth service for testing when backend is not available
export const loginUser = async (data: { email: string; password: string }) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (data.email === "test@edureach.ac.in" && data.password === "password123") {
    return {
      token: "mock-jwt-token-12345",
      user: {
        id: "1",
        name: "Test Student",
        email: "test@edureach.ac.in",
        phone: "+91 9876543210"
      }
    };
  }
  
  throw new Error("Invalid email or password");
};

export const registerUser = async (data: {
  name: string; email: string; password: string; phone?: string;
}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    token: "mock-jwt-token-12345",
    user: {
      id: "1",
      name: data.name,
      email: data.email,
      phone: data.phone || null
    }
  };
};

export const getMe = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    user: {
      id: "1",
      name: "Test Student",
      email: "test@edureach.ac.in",
      phone: "+91 9876543210"
    }
  };
};
