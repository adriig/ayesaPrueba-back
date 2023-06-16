import { Router } from "express";
import { loginController, meController, registerController } from "./auth.controller";
import isAuthenticated from "./middlewares/auth.middleware";

const router: Router = Router();
router.post("/login", loginController);
router.post("/register", registerController);
router.get("/me", isAuthenticated, meController);

export default router;
