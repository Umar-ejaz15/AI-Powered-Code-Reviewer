import aiServies from "../services/ai.service.js";

const getResponse = async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  const response = await aiServies(prompt);
  res.send(response);
};

export default {getResponse};
