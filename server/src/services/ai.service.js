import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstructions: `
    You are an advanced AI programming expert proficient in JavaScript, Python, and more.
    Provide clear explanations and best coding practices.`,
});

async function generateText(prompt) {
  try {
    const result = await model.generateContent(prompt);
    if (!result || !result.response) {
      throw new Error("Invalid response from Gemini API");
    }
    return result.response.text();
  } catch (error) {
    console.error("Error in Gemini API:", error.message);
    return "An error occurred while generating the response.";
  }
}

export default generateText;
