const {
  GoogleGenerativeAI,
} = require(
  "@google/generative-ai"
);

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const getSuggestions =
  async (req, res) => {

    console.log("🚀 AI route hit");

    try {

      const { goal } = req.body;

      const model =
        genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

      const prompt = `
Suggest 5 daily habits for this goal:
"${goal}"

Return only the habits,
one per line.
`;

      console.log("Using Gemini...");

      const result =
        await model.generateContent(
          prompt
        );

      console.log(
        "Response received"
      );

      const text =
        result.response.text();

      const suggestions =
        text
          .split("\n")
          .filter(
            (item) =>
              item.trim() !== ""
          );

      res.json(
        suggestions
      );

    } catch (error) {

      console.log(
        "❌ GEMINI FAILED"
      );

      console.log(error);

      res.status(500).json({
        message:
          "AI generation failed",
      });

    }

  };

module.exports = {
  getSuggestions,
};