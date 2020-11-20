const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController');

router.get("/signup", UserController.get_user);
router.post("/signup", UserController.new_user);

module.exports = router;