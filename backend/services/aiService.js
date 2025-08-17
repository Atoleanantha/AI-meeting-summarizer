import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateSummary(transcript, userPrompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    const finalPrompt = `
You are a highly skilled AI assistant specializing in summarizing meeting notes. 
Your task is to carefully read the following transcript and produce a **concise, well-structured summary**.

Transcript:
"""
${transcript}
"""

Guidelines:
1. Identify the main discussion points, key decisions, and important updates.  
2. Extract and clearly list **action items** (who needs to do what, and if possible, deadlines).  
3. Maintain a **professional, neutral tone**.  
4. Avoid unnecessary details or filler text.  
5. Present the summary in a structured format:
   - **Summary**
   - **Decisions**
   - **Action Items**

Additional Instructions (from user):  
${userPrompt || "Summarize clearly and include action items in bullet points."}
`;


    const result = await model.generateContent(finalPrompt);
    return result.response.text();
}

export { generateSummary };
