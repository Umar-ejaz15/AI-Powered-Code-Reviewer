import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

// CORS Configuration
app.use(cors({
  origin: "https://deven-dusky.vercel.app",
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200
}));

// Routes
app.use("/ai", aiRoutes);

// Error Handling
app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://deven-dusky.vercel.app");
  res.status(500).json({ error: "Server error" });
});

export default app;