const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc Generate a book outline
// @route POST /api/ai/generate-outline
// @access Private
const generateOutline = async (req, res) => {
  try {
    const { topic, style, numChapters, description } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Please provide a topic" });
    }

    // Updated prompt: force AI to include "Chapter X: ..." in titles
    const prompt = `ROLE:
You are a professional nonfiction book planner and editor.

TASK:
Create a complete, well-structured book outline.

BOOK DETAILS:
- Main Topic: "${topic}"
- Writing Style / Tone: "${style || "Clear and informative"}"
- Total Number of Chapters: ${numChapters || 5}
- Additional Description: "${description || "No additional description provided"}"

OUTLINE GUIDELINES:
- The outline should flow logically from beginner concepts to more advanced ideas.
- Each chapter should focus on ONE clear theme.
- Chapter summaries should clearly explain what the reader will learn.

OUTPUT FORMAT (VERY IMPORTANT):
- Respond ONLY with a valid JSON array.
- Do NOT include explanations, markdown, headings, or extra text.
- The first character MUST be "[" and the last character MUST be "]".
- Generate EXACTLY ${numChapters || 5} chapters.

CHAPTER OBJECT STRUCTURE:
{
  "chapter": number,
  "title": string,
  "summary": string
}

RULES:
- Chapter numbers must start at 1 and increase sequentially.
- Chapter titles MUST begin with the chapter number in the format "Chapter 1: <title>", "Chapter 2: <title>", etc.
- Chapter summaries should be 1–3 sentences and suitable for expanding into full chapters.
- Do not repeat ideas across chapters.

Now generate the JSON outline.`;

    // Generate AI content
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const text = response.text;

    // Extract JSON array from AI response
    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]");

    if (startIndex === -1 || endIndex === -1) {
      console.error("Could not find JSON array in AI response:", text);
      return res.status(500).json({
        message: "Failed to parse AI response, no JSON array found.",
      });
    }

    const jsonString = text.substring(startIndex, endIndex + 1);

    // Validate and format the JSON
    try {
      const outline = JSON.parse(jsonString);

      // Ensure every chapter title starts with "Chapter X: "
      const formattedOutline = outline.map((ch, idx) => ({
        chapter: ch.chapter || idx + 1,
        title: ch.title.startsWith("Chapter")
          ? ch.title
          : `Chapter ${idx + 1}: ${ch.title}`,
        summary: ch.summary,
      }));

      res.status(200).json({
        message: "Outline generated successfully",
        outline: formattedOutline,
      });
    } catch (e) {
      console.error("Failed to parse AI response:", jsonString);
      res.status(500).json({
        message:
          "Failed to generate a valid outline. The AI response was not valid JSON.",
      });
    }
  } catch (err) {
    console.error("Error generating outline:", err);
    res
      .status(500)
      .json({ message: "Server error during AI outline generation" });
  }
};

module.exports = {
  generateOutline,
};

// @desc Generate content for a chapter
// @route POST /api/ai/generate-chapter-content
// @access Private
const generateChapterContent = async (req, res) => {
  try {
    const { chapterTitle, chapterDescription, style } = req.body;

    if (!chapterTitle) {
      return res
        .status(400)
        .json({ message: "Please provide a chapter title" });
    }

    const prompt = `ROLE:
You are a professional nonfiction book author.

TASK:
Write the full, finished content for ONE book chapter.

CHAPTER DETAILS:
- Title: "${chapterTitle}"
- Purpose / Summary: "${chapterDescription || "No description provided"}"
- Writing Style / Tone: "${style || "Clear, informative, and engaging"}"

WRITING GUIDELINES:
- Write in complete paragraphs suitable for a published book.
- Maintain a smooth, natural flow from paragraph to paragraph.
- Explain ideas clearly and expand them with examples when helpful.
- Avoid repetition and filler.
- Assume the reader is intelligent but may be new to the topic.

FORMAT RULES (VERY IMPORTANT):
- DO NOT include the chapter title.
- DO NOT include headings, bullet lists, or numbered lists.
- DO NOT include JSON, markdown, or metadata.
- Output ONLY plain text paragraphs.
- Separate paragraphs with a single blank line.

LENGTH:
- Write a thorough chapter-length response (not a short summary).
- Cover the topic fully based on the chapter purpose.

Now write the complete chapter content.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    res.status(200).json({ content: response.text });
  } catch (err) {
    console.error("Error generating chapter:", err);
    res
      .status(500)
      .json({ message: "Server error during AI chapter generation" });
  }
};

module.exports = {
  generateOutline,
  generateChapterContent,
};
