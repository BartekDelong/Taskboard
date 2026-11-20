import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { registerSchema } from "../validation/auth.validation.js";
import { login } from "../controllers/auth.controller.js";
import { loginSchema } from "../validation/auth.validation.js";
import { getMe } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", authenticateToken, getMe);
export default router;
