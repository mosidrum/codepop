import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

import { explanationSystemPrompt } from "../../data/systemPrompts";

import type { ExplanationRequest } from "../../types";
import type { NextRequest } from "next/server";

const apikey = process.env.GEMINI_API_KEY;

if (!apikey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apikey);

export const POST = async (req: NextRequest) => {
  try {
    const { code }: ExplanationRequest = await req.json();

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: explanationSystemPrompt,
    });

    const prompt = [
      {
        role: "user",
        parts: [{ text: `Explain this code:\n\n${code}` }],
      },
    ];

    const result = await model.generateContent({
      contents: prompt,
    });

    const response = result.response.text();

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
};
