
import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 3000");
});

// export default app;