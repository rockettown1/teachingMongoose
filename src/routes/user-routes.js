const { Router } = require("express");
const inRoutes = require("../controllers/");
const router = Router();

router.post("/users", inRoutes.postUser);
router.get("/users", inRoutes.getAllUsers);
router.get("/users/:id", inRoutes.getSingleUser);

module.exports = router;
