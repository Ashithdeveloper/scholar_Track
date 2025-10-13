import User from "../model/user.model.js";
import { configDotenv } from "dotenv";
configDotenv();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const getScholarship = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Step 1: Create dynamic prompt
const Prompt = `
You are a scholarship recommendation expert.

Find **verified scholarships** that match:
- Category: ${user.caste}
- Percentage: ${user.percentage}
- Institution: ${user.institution}
- Last Education: ${user.lasteducation}

Return the response in **JSON format** only.
Include a **minimum of 5 and a maximum of 10 scholarships**.

Each scholarship must include the following fields:

{
  "scholarship_name": "",
  "provider": "",
  "scholar_prize": "",
  "deadline": "",
  "description": "Provide a detailed description including the purpose of the scholarship, who it is intended for, eligibility nuances, focus areas, and any special notes or requirements.",
  "eligibility_criteria": "Clearly list the eligibility conditions in detail, such as academic, demographic, or institutional requirements.",
  "benefits": "List all benefits provided by the scholarship, including financial support, mentorship, networking opportunities, or other perks.",
  "required_documents": [],
  "application_process_steps": [],
  "website_link": ""
}

Only output the JSON array. Do not include explanations or extra text.
`;


    // Step 2: Initialize model
    const model = genai.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    // Step 3: Generate content
    const result = await model.generateContent(Prompt);

    let text = result.response.text();

    // Step 4: Clean and safely parse JSON
    // Gemini sometimes returns extra text before/after JSON, so we sanitize it
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]");
    let scholarships = [];

    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonString = text.substring(jsonStart, jsonEnd + 1);
      try {
        scholarships = JSON.parse(jsonString);
      } catch (err) {
        console.error("JSON Parse Error:", err);
      }
    }

    // Step 5: Return Gemini response + user data
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        caste: user.caste,
        percentage: user.percentage,
        institution: user.institution,
        lasteducation: user.lasteducation,
      },
      scholarships,
    });
  } catch (error) {
    console.error("❌ Error fetching scholarships:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch scholarship data",
    });
  }
};