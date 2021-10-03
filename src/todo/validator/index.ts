import { body, param, query } from "express-validator";

class TodoValidator {
  checkCreateTodo() {
    return [
      body("id").optional().isUUID(4).withMessage("uuid v4 is required"),
      body("title")
        .notEmpty()
        .withMessage("The title value should not be empty"),
      body("completed")
        .optional()
        .isBoolean()
        .withMessage("the values shold be boolean")
        .isIn([0, false])
        .withMessage("should be 0 or false"),
    ];
  }
  checkReadTodo() {
    return [
      query("limit")
        .notEmpty()
        .withMessage("The query limit should be not empty")
        .isInt({ min: 1, max: 10 })
        .withMessage("the limit value shold be number and between 1-10"),
      query("offset").optional().isNumeric().withMessage("should be number"),
    ];
  }
  checkIdParams() {
    return [
      param("id")
        .notEmpty()
        .withMessage("the value should be not empty")
        .isUUID(4)
        .withMessage("the value should be UUIDV4"),
    ];
  }
}

export default new TodoValidator();
