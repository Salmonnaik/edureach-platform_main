// Chat service for EduReach Bot
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || "http://localhost:5000";

export interface ChatResponse {
  message: string;
}

export async function sendMessage(message: string): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    // Fallback response for demo purposes
    return {
      message: "I'm here to help! For detailed information about courses, admissions, or campus life, please contact our admissions office at admissions@edureach.edu.in or call 1800-123-456."
    };
  }
}

// Mock responses for development when backend is not available
const mockResponses: Record<string, string> = {
  "courses": "EduReach offers the following programs:\n\n🎓 B.Tech Programs:\n• Computer Science & Engineering (120 seats)\n• Electronics & Communication (60 seats)\n• Mechanical Engineering (60 seats)\n• Civil Engineering (60 seats)\n\n📊 MBA Programs:\n• Tech Management (60 seats)\n• Data Science & Analytics (40 seats)\n\nAll programs are NAAC A+ accredited with excellent placement records.",
  
  "placements": "Our placement statistics are impressive:\n\n📈 Overall Placement Rate: 92%\n💼 Highest Package: ₹28 LPA\n💰 Average Package: ₹12.4 LPA\n🏢 500+ Hiring Partners\n🌟 Top Recruiters: Google, Microsoft, Amazon, Infosys, TCS, Wipro\n\nWe provide dedicated placement training and career guidance throughout your program.",
  
  "fees": "Fee Structure for 2026-27:\n\n📚 B.Tech Programs: ₹1,20,000/year\n📊 MBA Programs: ₹1,80,000/year\n\n💰 Scholarships Available:\n• Merit-based up to 50% fee waiver\n• Sports quota scholarships\n• Economically weaker sections support\n\nPayment can be made semester-wise with EMI options available.",
  
  "admissions": "Admissions Process 2026:\n\n📝 Eligibility:\n• B.Tech: 10+2 with PCM, minimum 60%\n• MBA: Bachelor's degree with 50%\n\n🎯 How to Apply:\n1. Fill online application form\n2. Submit required documents\n3. Appear for entrance exam/interview\n4. Receive admission offer\n5. Complete fee payment\n\n📅 Important Dates:\n• Application starts: March 2026\n• Last date: May 2026\n• Classes begin: August 2026"
};

export function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return "I can help you with information about our courses, placements, fees, and admissions. Could you please specify what you'd like to know more about?";
}
