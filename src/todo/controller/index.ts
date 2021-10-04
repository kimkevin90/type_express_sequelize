import { v4 as uuidv4 } from "uuid";
import { TodoInstance } from "../model";
import express, { NextFunction, Request, Response } from "express";
class TodoController {
  async create(req: Request, res: Response) {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "Success todo" });
    } catch (e) {
      return res.json({ msg: "fail todo", status: 500, route: "/create" });
    }
  }

  async readPaginantion(req: Request, res: Response) {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;

      const record = await TodoInstance.findAll({
        where: {},
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
      });

      return res.json(record);
    } catch (e) {
      return res.json({ msg: "fail todo", status: 500, route: "/read" });
    }
  }

  async readById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      return res.json(record);
    } catch (e) {
      console.log(e);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ msg: "해당 리스트는 없음" });
      }

      const updatedRecord = await record.update({
        completed: !record.getDataValue("completed"),
      });

      return res.json({ record: updatedRecord });
    } catch (e) {
      console.log(e);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ msg: "해당 리스트는 없음" });
      }

      const deleteRecord = await record.destroy();
      return res.json({ record: deleteRecord });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TodoController();
