const express = require('express');
const authMiddlware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const router = express.Router();

router.get("/welcome", authMiddlware, adminMiddleware, (req, res) => {
  //const { username, userId, role } = req.userInfo;
  res.json({
    message: "Welcome to the admin page",
    // user: {
    //   _id: userId,
    //   username,
    //   role,
    // },
  });
});

module.exports = router;