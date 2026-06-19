import type { Request, Response } from "express";

export interface VapiCallRequest {
  phone: string;
  course: string;
  topic: string;
}

export const initiateVapiCall = async (req: Request, res: Response) => {
  try {
    const { phone, course, topic }: VapiCallRequest = req.body;

    if (!phone || !course || !topic) {
      return res.status(400).json({ error: "Phone, course, and topic are required" });
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/[-\s]/g, ""))) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    // TODO: Integrate with actual VAPI API
    // For now, we'll simulate the call initiation
    console.log(`VAPI Call Request:`, {
      phone,
      course,
      topic,
      timestamp: new Date().toISOString()
    });

    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In production, this would make an actual API call to VAPI
    // const vapiResponse = await vapiClient.calls.create({
    //   assistant: "your-assistant-id",
    //   phoneNumber: phone,
    //   customer: {
    //     name: user?.name || "Student",
    //     number: phone
    //   },
    //   metadata: {
    //     course,
    //     topic,
    //     source: "edureach-website"
    //   }
    // });

    res.json({ 
      success: true,
      message: "Call initiated successfully",
      phone,
      course,
      topic
    });

  } catch (error) {
    console.error("VAPI call error:", error);
    res.status(500).json({ error: "Failed to initiate call" });
  }
};
