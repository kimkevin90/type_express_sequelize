import express, { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import db from "./config/database.config";
import { TodoInstance } from "./model";
import TodoValidator from "./validator/index";
import Middleware from "./middleware";
db.sync({ force: false }).then(() => {
  console.log("db connected");
});

const app = express();
const port = 9000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("hello");
});

// const human = TodoInstance.build({
//   id: "charlie",
//   title: "dasf",
//   completed: false,
// }).save();

app.post(
  "/create",
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, meg: "Success todo" });
    } catch (e) {
      return res.json({ msg: "fail todo", status: 500, route: "/create" });
    }
  }
);

app.get(
  "/read",
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit as number | undefined;
      const offset = req.query.offset as number | undefined;

      const record = await TodoInstance.findAll({
        where: {},
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
      });

      return res.json(record);
    } catch (e) {
      console.log(e);
    }
  }
);

// app.use("/api/v1", todoRouter);

app.listen(port, () => {
  console.log("server is running");
});
// export default app;
