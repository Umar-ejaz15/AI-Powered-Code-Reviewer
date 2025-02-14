import express from "express";
import aiRoute from "./routes/ai.routes.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const frontendURL = 'https://ai-powered-code-reviewer-silk.vercel.app/' // production URL
app.use(cors({
    origin: frontendURL,  // Allow requests from your frontend domain
    methods: 'GET,POST,PUT,DELETE',  // Allowed methods
    credentials: true,  // Allow cookies if needed (e.g., for authentication)
  }));
  
// const aiRoutes = require('./routes/ai.routes');
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/ai", aiRoute);

export default app;
