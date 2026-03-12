import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

import { codeGenerationSystemPrompt } from "../../data/systemPrompts";

import type { GenerateCodeRequest } from "../../types";
import type { NextRequest } from "next/server";

const apikey = process.env.GEMINI_API_KEY;

if (!apikey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apikey);

export const POST = async (req: NextRequest) => {
  try {
    const { language, description }: GenerateCodeRequest = await req.json();

    if (!description || !language) {
      return NextResponse.json(
        { error: "No description or language provided" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: codeGenerationSystemPrompt,
    });

    const prompt = [
      {
        role: "user",
        parts: [
          {
            text: `Generate a ${language ?? "JavaScript"} code that solves this description:\n\n${description}\n\n`,
          },
        ],
      },
    ];

    const result = await model.generateContent({
      contents: prompt,
    });

    const response = result.response.text();

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
};
