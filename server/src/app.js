import express from "express";
import aiRoute from "./routes/ai.routes.js";
import cors from "cors";


const app = express();

app.use(
    cors({
      origin: "https://ai-powered-code-reviewer-silk.vercel.app", // Allow your frontend domain
      methods: "GET,POST,PUT,DELETE",
      credentials: true, // If you're using cookies or authentication
    })
  );
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const aiRoutes = require('./routes/ai.routes');

app.use("/ai", aiRoute);

export default app;
