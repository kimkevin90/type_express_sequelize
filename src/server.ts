import express, { NextFunction, Request, Response } from "express";

import db from "./config/database.config";

import todoRouter from "./todo/routes";

db.sync({ force: false }).then(() => {
  console.log("db connected");
});

const app = express();
const port = 9000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("hello");
});

app.use("/api/v1", todoRouter);

app.listen(port, () => {
  console.log("server is running");
});
