import express from "express";
import cors from "cors"; // ✅ Import CORS

const app = express();
app.use(express.json());

// ✅ Configure CORS
app.use(
  cors({
    origin: "https://ai-powered-code-reviewer-silk.vercel.app", // ✅ Allow only your frontend domain
    methods: ["POST", "GET"], // ✅ Allow necessary HTTP methods
    allowedHeaders: ["Content-Type"], // ✅ Allow necessary headers
    credentials: true, // ✅ Allow credentials (cookies, auth headers, etc.)
  })
);

// ✅ Manually set CORS headers (for safety)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ai-powered-code-reviewer-silk.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use((req, res, next) => {
    req.setTimeout(60000); // ⏳ 60 seconds timeout (adjust as needed)
    next();
  });
  

// ✅ Handle preflight (OPTIONS request)
app.options("*", (req, res) => res.sendStatus(200));

export default app;
