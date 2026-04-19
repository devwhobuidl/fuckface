import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

export const maxDuration = 60; 
export const dynamic = "force-dynamic";

// Simple in-memory rate limiter
interface RateLimitData {
  count: number;
  resetAt: number;
}
const RATE_LIMIT_MAP = new Map<string, RateLimitData>();
const MAX_REQUESTS_PER_HOUR = 4;
const HOUR_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting Logic
    const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
    const now = Date.now();
    
    let limitData = RATE_LIMIT_MAP.get(ip);
    if (!limitData || now > limitData.resetAt) {
      limitData = { count: 0, resetAt: now + HOUR_MS };
    }
    
    if (limitData.count >= MAX_REQUESTS_PER_HOUR) {
      return NextResponse.json(
        { error: "Daily free quota reached — try again tomorrow or support the fuckface fund 🖕" }, 
        { status: 429 }
      );
    }
    
    limitData.count++;
    RATE_LIMIT_MAP.set(ip, limitData);

    // 2. Payload Validation
    const { imageBase64, customText, preset } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "Missing image payload." }, { status: 400 });
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json({ error: "Missing HUGGINGFACE_API_KEY developer config." }, { status: 500 });
    }

    // 3. Prompt Construction
    const textOverlay = customText ? `Overlay bold handwritten text: "${customText}". ` : "Bold handwritten 'fuck' text on the left and 'face' on the right. ";
    
    let styleAdditions = "";
    if (preset === "sbf") {
        styleAdditions = "Explicitly make them look like Sam Bankman-Fried with curly hair and an FTX t-shirt. ";
    } else if (preset === "sonic") {
        styleAdditions = "Explicitly mutate them into a Sonic the Hedgehog character crying with blue spikes and red shoes. ";
    }

    // User's new powerful prompt template
    const prompt = `Highly detailed crying fuckface wojak meme of the person in the uploaded image: big streaming blue tears from the eyes, huge middle finger raised in the center of the face, sad angry troll degen expression, chaotic meme energy. ${styleAdditions}${textOverlay}Dark high-contrast aesthetic. Keep the face recognizable but fully meme-ified like classic Wojak, SBF FTX shirt, or Sonic crying versions.`;

    // 4. Decode base64 to Blob
    const base64Data = imageBase64.split(',')[1];
    if (!base64Data) {
      throw new Error("Invalid base64 encoding pattern");
    }
    const imageBuffer = Buffer.from(base64Data, "base64");
    const imageBlob = new Blob([imageBuffer], { type: "image/jpeg" });

    // 5. Hugging Face Inference with InferenceClient
    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
    
    const modelsToTry = [
      "stabilityai/stable-diffusion-xl-base-1.0",
      "stabilityai/sdxl-turbo",
      "runwayml/stable-diffusion-v1-5"
    ];

    let resultBlob: Blob | null = null;
    let lastError = "";

    for (const model of modelsToTry) {
      try {
        console.log(`Attempting generation with model: ${model} using hf-inference provider`);
        
        // Standard Image-to-Image call
        resultBlob = await client.imageToImage({
          model: model,
          inputs: imageBlob,
          parameters: {
            prompt: prompt,
            negative_prompt: "normal, happy, well-drawn, professional, photorealistic, boring, clean, text-free, unedited",
            strength: 0.85,
          },
          provider: "hf-inference" // Bypassing problematic nscale/external providers
        });
        
        if (resultBlob) break;
      } catch (err: any) {
        lastError = err.message;
        console.error(`Model ${model} failed:`, lastError);
        continue;
      }
    }

    if (!resultBlob) {
        throw new Error(lastError || "Empty response returned from all fallback models.");
    }

    // Convert returned output Blob back to base64 for client DOM rendering
    const arrayBuffer = await resultBlob.arrayBuffer();
    const outputBuffer = Buffer.from(arrayBuffer);
    const outputBase64 = `data:image/jpeg;base64,${outputBuffer.toString('base64')}`;

    return NextResponse.json({ 
      success: true, 
      image: outputBase64 
    });
  } catch (error: any) {
    console.error("HF Inference Final Error:", error.message);
    
    if (error.message.includes("is currently loading") || error.message.includes("503") || error.message.includes("queue")) {
        return NextResponse.json({ error: "Free tier is busy — wait 30-60 seconds and try again 🖕😭" }, { status: 503 });
    }

    return NextResponse.json({ error: "Hugging Face credits low or all fallback models failed — try again later." }, { status: 500 });
  }
}
