import Express from "express";
import userRouter from "./routes/user.routes.js";
import registerRouter from "./routes/auth.routes.js";
import authRouter from "./routes/auth.routes.js";

import mongoose from "mongoose";
await mongoose.connect("mongodb://127.0.0.1:27017/node-server");

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
app.use("/register", registerRouter);
app.use("/auth", authRouter);
