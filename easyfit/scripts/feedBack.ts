import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB_K1FGlQ4UGu_x0_eYXg1pqm8mPSaDneA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface UserData {
  previous: {
    height: number; // in cm
    weight: number; // in kg
  };
  current: {
    height: number; // in cm
    weight: number;
    goal: string // in kg
  };
}

const formatFeedbackRequest = (data: UserData) => {
  return `Generate feedback based on the following user data for the goal ${data.current.goal}:
  Previous Height: ${data.previous.height} cm
  Previous Weight: ${data.previous.weight} kg
  Current Height: ${data.current.height} cm
  Current Weight: ${data.current.weight} kg`;
};

export async function generateFeedback(data: UserData): Promise<string> {
  const maxRetries = 3; // Set maximum retries
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const request = formatFeedbackRequest(data);
      const result = await model.generateContent(request);
      return result.response.text();
    } catch (error) {
      if (error.message.includes("SAFETY")) {
        console.warn("Safety block encountered, attempting again...");
        attempt++;
      } else {
        console.error("Error generating content:", error);
        throw error; // Rethrow for other errors
      }
    }
  }

  throw new Error("Failed to generate content after multiple attempts.");
}
