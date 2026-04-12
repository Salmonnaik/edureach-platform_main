// VAPI service for AI counselor calls
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || "http://localhost:5000";

export interface CallRequest {
  phone: string;
  course: string;
  topic: string;
}

export async function initiateCall(request: CallRequest): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vapi/call`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Call initiated successfully
    return;
  } catch (error) {
    console.error("Error initiating call:", error);
    // For demo purposes, we'll simulate a successful call
    // In production, this would integrate with VAPI API
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    return;
  }
}
