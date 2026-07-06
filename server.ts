import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route first: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Lazy initializer for Google GenAI client to prevent startup crash if API key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API route: AI Art Inspiration Generator
app.post("/api/generate-inspiration", async (req, res) => {
  try {
    const { category, medium, mood } = req.body;
    const ai = getAiClient();

    const promptText = `
You are an advanced creative coach and digital art advisor.
The artist wants a high-quality creative prompt.
- Category/Genre: ${category || 'Abstract Art'}
- Medium: ${medium || 'Digital Vector / Acrylic painting'}
- Mood/Tone: ${mood || 'Surreal, Nostalgic, Vibrant'}

Generate a professional visual art prompt. It must include:
1. "title": A majestic, poetic title for the artwork.
2. "prompt": A highly descriptive scene detail (3-4 sentences detailing lighting, layout, elements).
3. "palette": An array of exactly 4 hexadecimal color codes (representing complementary colors, shadows, highlight, accent).
4. "technique": A practical technique advice to try (e.g., "Use high-contrast blending modes like Color Dodge", "Underglaze with warm burnt umber first").

Return the result as a strictly structured JSON object.
Return ONLY valid JSON in the output response. Do NOT use markdown code block formatting (like \`\`\`json).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const inspirationData = JSON.parse(text.trim());
    res.json(inspirationData);
  } catch (error: any) {
    console.error("Gemini API Error in generate-inspiration:", error);
    res.status(500).json({
      error: error.message || "Failed to generate inspiration. Please verify GEMINI_API_KEY is configured in Secrets panel.",
      title: "Silent Horizon",
      prompt: "A backup prompt: A lone silhouette standing on the edge of a deep digital canyon, overlooking neon river flows, under a massive full moon.",
      palette: ["#6C63FF", "#FF6584", "#121212", "#F8F9FC"],
      technique: "Try layer masks and a soft brush set to 20% opacity for smooth glow gradients."
    });
  }
});

async function startServer() {
  // Vite integration middleware for dev environment
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
