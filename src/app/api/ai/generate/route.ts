import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { prompt, type, brandVoice } = await req.json();
    const systemPrompt = `You are BrandAI, a marketing content generator. Create ${type} content following these brand guidelines:\nTone: ${brandVoice?.tone || "Professional"}\nPersonality: ${brandVoice?.personality || "Innovative"}\nVocabulary: ${brandVoice?.vocabulary || "Accessible"}\n\nGenerate high-quality, engaging marketing content.`;
    const content = await generateAIResponse(systemPrompt, prompt);
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
