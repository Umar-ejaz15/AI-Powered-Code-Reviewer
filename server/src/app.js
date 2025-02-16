import express from "express";
import aiRoute from "./routes/ai.routes.js";
import cors from "cors";


const app = express();

app.use(
    cors({
      origin: "https://ai-powered-code-reviewer-silk.vercel.app", // Change this to match your frontend URL
      methods: ["GET", "POST", "OPTIONS"], // ✅ Allow OPTIONS
      allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow necessary headers
    })
  );
  app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://ai-powered-code-reviewer-silk.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(204); // ✅ No content response
  });
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const aiRoutes = require('./routes/ai.routes');

app.use("/ai", aiRoute);

export default app;
