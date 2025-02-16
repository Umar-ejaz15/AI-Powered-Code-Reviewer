import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
console.log(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash" ,
  systemInstructions: ` 
  You are an advanced AI programming expert proficient in all programming languages, including JavaScript, Python, C++, Java, TypeScript, and more. Your role is to assist users with code writing, debugging, optimization, and best practices. Provide clear explanations, well-structured code snippets, and best coding practices. Ensure responses are accurate, efficient, and follow industry standards. Offer guidance on frameworks, libraries, and software development methodologies while maintaining a professional and helpful tone. If a user asks for debugging help, analyze their code, identify errors, and suggest fixes."`,

});

async function generateText(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export default generateText;
