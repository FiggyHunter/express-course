import Express from "express";
import userRouter from "./routes/user.routes.js";

const app = Express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World! v5");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/health", (req, res) => {
  res.send("This is the health endpoint.");
});

app.use("/users", userRouter);
