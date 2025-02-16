import express from "express";
import cors from "cors"; // ✅ Import CORS middleware

const app = express();
app.use(express.json());

// ✅ Enable CORS for all domains or specify allowed origins
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["POST", "GET"], // Allow only specific methods
    allowedHeaders: ["Content-Type"], // Allow required headers
  })
);

// ✅ Set headers manually (optional)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ✅ Handle preflight requests
app.options("*", (req, res) => res.sendStatus(200));

export default app;
