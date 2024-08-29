import express from "express";
import { verifyToken } from "../middleware/verifyToken.mjs";
import { getUser } from "../controllers/userData.mjs";

const userRoutes = express.Router({ mergeParams: true });

userRoutes.get("/:id", getUser);

// userRoutes.get("/:id", verifyToken, getUser);

export default userRoutes;
