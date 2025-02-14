import express from "express";
import aiRoute from "./routes/ai.routes.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// const aiRoutes = require('./routes/ai.routes');
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/ai", aiRoute);

export default app;
