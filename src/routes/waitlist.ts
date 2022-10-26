require("dotenv").config();
import { Router } from "express";
import { body } from "express-validator";
const router = Router();
const { joinWaitlist } = require("../controllers/waitlist");
router.post(
    "/join-waitlist",
    body("name", "user's name is required").isString(),
    body("email", "user's email is required").isEmail(),
    body("affiliateMarketer", "affiliateMarketer is required").isBoolean(),
    body("contentCreator", "contentCreator is required").isBoolean(),
    joinWaitlist,
);

module.exports = router;
