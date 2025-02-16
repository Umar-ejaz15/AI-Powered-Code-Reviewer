import express from "express";
import cors from "cors"; // ✅ Import CORS

const app = express();
app.use(express.json());

// ✅ Configure CORS
app.use(
  cors({
    origin: "https://deven-dusky.vercel.app", // ✅ Allow only your frontend domain
    methods: ["POST", "GET"], // ✅ Allow necessary HTTP methods
    // allowedHeaders: ["Content-Type"], // ✅ Allow necessary headers
    // credentials: true, // ✅ Allow credentials (cookies, auth headers, etc.)
  })
);

// ✅ Manually set CORS headers (for safety)



// ✅ Handle preflight (OPTIONS request)
app.options("*", (req, res) => res.sendStatus(200));

export default app;
