const { Router } = require("express");
const inRoutes = require("../controllers/");
const router = Router();

//task routes
router.post("/tasks", inRoutes.postTask);
router.get("/tasks", inRoutes.getAllTasks);
router.get("/tasks/:id", inRoutes.getTask);
router.patch("/tasks/:id", inRoutes.updateTask);
router.delete("/tasks/:id", inRoutes.deleteTask);

module.exports = router;
