import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB_K1FGlQ4UGu_x0_eYXg1pqm8mPSaDneA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const formatUserData = (userData) => {
  return `Create a month-long fitness plan for a user with the following details:
  - Height: ${userData.height} cm
  - Weight: ${userData.weight} kg
  - Fitness Goal: ${userData.goal}
  - Age: ${userData.age}
  - Gender: ${userData.gender}`;
};

export async function generatePlan(userData: object) {
  const maxRetries = 3; // Set maximum retries
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const result = await model.generateContent(formatUserData(userData));
      const title = await model.generateContent(`Generate a short fitness plan title based on the following plan. Return only one title as plain text: ${await result.response.text()}.`);
      return [result.response.text(), title.response.text()];
    } catch (error) {
      if (error.message.includes("SAFETY")) {
        console.warn("Safety block encountered, attempting again...");
        attempt++;
      } else {
        console.error("Error generating content:", error);
        throw error;  // Rethrow for other errors
      }
    }
  }

  throw new Error("Failed to generate content after multiple attempts.");
}
