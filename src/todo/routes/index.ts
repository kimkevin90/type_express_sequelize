import express from "express";
import TodoValidator from "../validator/index";
import Middleware from "../../middleware";
import TodoController from "../controller";
const router = express.Router();

router.post(
  "/create",
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationError,
  TodoController.create
);

router.get(
  "/read",
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationError,
  TodoController.readPaginantion
);

router.get(
  "/read/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationError,
  TodoController.readById
);

router.put(
  "/update/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationError,
  TodoController.update
);

router.delete(
  "/delete/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationError,
  TodoController.delete
);

export default router;
