import type { Request, Response } from "express";

// Mock responses for the chatbot
const mockResponses: Record<string, string> = {
  courses: "EduReach offers the following programs:\n\n🎓 B.Tech Programs:\n• Computer Science & Engineering (120 seats)\n• Electronics & Communication (60 seats)\n• Mechanical Engineering (60 seats)\n• Civil Engineering (60 seats)\n\n📊 MBA Programs:\n• Tech Management (60 seats)\n• Data Science & Analytics (40 seats)\n\nAll programs are NAAC A+ accredited with excellent placement records.",
  
  placements: "Our placement statistics are impressive:\n\n📈 Overall Placement Rate: 92%\n💼 Highest Package: ₹28 LPA\n💰 Average Package: ₹12.4 LPA\n🏢 500+ Hiring Partners\n🌟 Top Recruiters: Google, Microsoft, Amazon, Infosys, TCS, Wipro\n\nWe provide dedicated placement training and career guidance throughout your program.",
  
  fees: "Fee Structure for 2026-27:\n\n📚 B.Tech Programs: ₹1,20,000/year\n📊 MBA Programs: ₹1,80,000/year\n\n💰 Scholarships Available:\n• Merit-based up to 50% fee waiver\n• Sports quota scholarships\n• Economically weaker sections support\n\nPayment can be made semester-wise with EMI options available.",
  
  admissions: "Admissions Process 2026:\n\n📝 Eligibility:\n• B.Tech: 10+2 with PCM, minimum 60%\n• MBA: Bachelor's degree with 50%\n\n🎯 How to Apply:\n1. Fill online application form\n2. Submit required documents\n3. Appear for entrance exam/interview\n4. Receive admission offer\n5. Complete fee payment\n\n📅 Important Dates:\n• Application starts: March 2026\n• Last date: May 2026\n• Classes begin: August 2026"
};

export const handleChatMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Simple keyword-based response matching
    const lowerMessage = message.toLowerCase();
    let response = "I can help you with information about our courses, placements, fees, and admissions. Could you please specify what you'd like to know more about?";

    for (const [key, mockResponse] of Object.entries(mockResponses)) {
      if (lowerMessage.includes(key)) {
        response = mockResponse;
        break;
      }
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({ message: response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
