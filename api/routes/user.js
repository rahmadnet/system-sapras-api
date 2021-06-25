const express = require('express');
const router = express.Router();
require("dotenv").config();
const checkAuth = require('../middleware/check-auth');
const UserController = require('../contollers/user');

router.get("/", UserController.user_get_all);
router.post("/signup", UserController.user_signup);
router.post('/login', UserController.user_login);
router.delete("/:userId", UserController.user_delete);


module.exports = router;