import express from "express";
import aiRoute from "./routes/ai.routes.js";
import cors from "cors";


const app = express();

app.use(
    cors({
      origin: ["https://ai-powered-code-reviewer-silk.vercel.app"], // Allow specific frontend
    //   methods: ["GET", "POST", "PUT", "DELETE",""], // Specify methods
    methods: ["GET", "POST", "OPTIONS"],

      allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
    //   credentials: true, // Allow cookies if needed
    })
  );
  app.options("*", cors()); // Handles preflight requests

  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const aiRoutes = require('./routes/ai.routes');

app.use("/ai", aiRoute);

export default app;
