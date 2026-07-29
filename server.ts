import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily/safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", driveFolder: "1hP-tx1FNw6qSx56L0nPexb5r6vCSElRr" });
});

// AI Q&A / Summarizer endpoint for the Google Drive content package
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, context } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `Here is a summary based on the resource context: "${message}". Note: Connect a valid GEMINI_API_KEY in environment to unlock live AI responses!`,
        source: "fallback"
      });
    }

    const systemInstruction = `You are an expert content assistant for a Google Drive resource package containing 4 primary assets:
1. Explainer Video ("Product Architecture & Core Vision", 4:15 min)
2. PDF Presentation Deck ("Executive Summary & Roadmap", 12 Slides)
3. Audio Overview Track ("Deep Dive Discussion & Q&A", 8:30 min)
4. Key Infographic ("System Workflow & Ecosystem Blueprint", High-Res)

The Google Drive link is: https://drive.google.com/drive/u/0/folders/1hP-tx1FNw6qSx56L0nPexb5r6vCSElRr

Answer the user's questions clearly, accurately, and concisely based on these learning materials.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemInstruction}\n\nContext: ${JSON.stringify(context || {})}\n\nUser Question: ${message}` }] }
      ]
    });

    const replyText = response.text || "I was unable to process the summary request.";
    res.json({ reply: replyText, source: "gemini" });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: err.message || "Failed to generate AI response" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
