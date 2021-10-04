import request from "supertest";
import app from "../src/app";
import { TodoInstance } from "../src/todo/model";

describe("test create route", () => {
  const todo = {
    title: "create todo",
  };

  test("Should have key record and msg when created", async () => {
    const mockCreateTodo = jest.fn(() => todo);
    jest
      .spyOn(TodoInstance, "create")
      .mockImplementation(() => mockCreateTodo());
    const res = await request(app).post("/api/v1/create").send(todo);
    expect(mockCreateTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty("msg");
    expect(res.body).toHaveProperty("record");
  });

  test("request shold hanlde exception", async () => {
    const mockCreateTodo = jest.fn((): any => {
      throw "error";
    });
    jest
      .spyOn(TodoInstance, "create")
      .mockImplementation(() => mockCreateTodo());
    const res = await request(app).post("/api/v1/create").send(todo);
    expect(mockCreateTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      msg: "fail todo",
      status: 500,
      route: "/create",
    });
  });

  test("handle body", async () => {
    // 빈 객체 body 전달
    const res = await request(app).post("/api/v1/create").send({});
    // 이미 toHaveBeenCalledTimes 전에 validator에서 걸러짐
    // expect(mockCreateTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      msg: "The title value should not be empty",
      param: "title",
      location: "body",
    });
  });
});

describe("test read pagination route", () => {
  const todo = {
    title: "create todo",
  };

  test("Should return array of todo", async () => {
    const mockReadAllTodo = jest.fn((): any => [todo]);
    jest
      .spyOn(TodoInstance, "findAll")
      .mockImplementation(() => mockReadAllTodo());
    const res = await request(app).get("/api/v1/read?limit=5");
    expect(mockReadAllTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual([todo]);
  });

  test("request shold hanlde exception", async () => {
    const mockReadAllTodo = jest.fn((): any => {
      throw "error";
    });
    jest
      .spyOn(TodoInstance, "findAll")
      .mockImplementation(() => mockReadAllTodo());
    const res = await request(app).get("/api/v1/read?limit=5");
    expect(mockReadAllTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({ msg: "fail todo", status: 500, route: "/read" });
  });

  test("handle params", async () => {
    // 빈 객체 body 전달
    const res = await request(app).get("/api/v1/read").send({});
    // 이미 toHaveBeenCalledTimes 전에 validator에서 걸러짐
    // expect(mockCreateTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      msg: "The query limit should be not empty",
      param: "limit",
      location: "query",
    });
  });
});
