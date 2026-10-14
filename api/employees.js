import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";
import express from "express";
const employeeRouter = express.Router();
export default employeeRouter;

employeeRouter
  .get("/", async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
  })
  .post("/", async (req, res) => {
    if (!req.body) return res.status(400).send("missing body");
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary)
      return res.status(400).send("missing field");
    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  });

employeeRouter
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const employee = await getEmployee(id);
    if (!employee) return res.status(404).send("not found");
    res.send(employee);
  })
  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    const employee = await deleteEmployee(id);
    if (!employee) return res.status(404).send("not found");
    res.sendStatus(204);
  })
  .put("/:id", async (req, res) => {
    const id = req.params.id;
    if (!req.body) return res.status(400).send("missing body");
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary)
      return res.status(400).send("missing field");
    const employee = await updateEmployee({ id, name, birthday, salary });
    if (!employee) return res.status(404).send("not found");
    res.status(200).send(employee);
  });
