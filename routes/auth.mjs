import express from "express";
import { login, signup } from "../controllers/auth.mjs";

const authRoutes = express.Router({ mergeParams: true });

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

export default authRoutes;
