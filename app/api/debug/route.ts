import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

import { debuggingSystemPrompt } from "../../data/systemPrompts";

import type { CodeDebuggingRequest } from "../../types";
import type { NextRequest } from "next/server";

const apikey = process.env.GEMINI_API_KEY;

if (!apikey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apikey);

export const POST = async (req: NextRequest) => {
  try {
    const { code, error: errorOnCode }: CodeDebuggingRequest = await req.json();

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: debuggingSystemPrompt,
    });

    const prompt = [
      {
        role: "user",
        parts: [
          { text: `Please debug this:\n\n${code}\n\n` },
          ...(errorOnCode ? [{ text: `Error:\n${errorOnCode}` }] : []),
        ],
      },
    ];

    const result = await model.generateContent({
      contents: prompt,
    });

    const response = result.response.text();

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    //eslint-disable-next-line no-console
    console.error("Error in API route:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
};
