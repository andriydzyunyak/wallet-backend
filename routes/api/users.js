const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { auth, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { userRegisterSchema, userLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(userRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validation(userLoginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrentUser));
router.get("/current/balance", auth, ctrlWrapper(ctrl.getBalance));

module.exports = router;
