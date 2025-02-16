import express from "express";
import aiRoute from "./routes/ai.routes.js";
import cors from "cors";


const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
));

// const aiRoutes = require('./routes/ai.routes');

app.use("/ai", aiRoute);

export default app;
