import express from "express";
import cors from "cors"; // ✅ Import CORS
import aiRoutes from "./routes/ai.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Configure CORS
app.use(
  cors({
    origin: "https://deven-dusky.vercel.app", // ✅ Allow only your frontend domain
    methods: ["POST", "GET"], // ✅ Allow necessary HTTP methods
    // allowedHeaders: ["Content-Type"], // ✅ Allow necessary headers
    // credentials: true, // ✅ Allow credentials (cookies, auth headers, etc.)
  })
);
app.use("/ai", aiRoutes);

// ✅ Manually set CORS headers (for safety)



// ✅ Handle preflight (OPTIONS request)
app.options("*", (req, res) => res.sendStatus(200));

export default app;
