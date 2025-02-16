
import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

app.use((req, res, next) => {
  req.setTimeout(30000); // ⏳ 30 seconds server timeout
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 3000");
});

// export default app;