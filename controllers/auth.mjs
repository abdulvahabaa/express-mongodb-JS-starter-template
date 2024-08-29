import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import collecion from "../connection/collecion.mjs";
import connectToDatabase from "../connection/db.mjs";
import { v7 as uuidv7 } from "uuid";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const db = await connectToDatabase("PERSONAL");

    const user = await db
      .collection(collecion.USER_COLLECTIION)
      .findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User alredy exist." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = uuidv7();

    const result = await db.collection(collecion.USER_COLLECTIION).insertOne({
      userId,
      name,
      email,
      password: passwordHash,
      isActive: true,
      cratedAt: Date.now(),
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = await connectToDatabase("PERSONAL");
    const user = await db
      .collection(collecion.USER_COLLECTIION)
      .findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "2h", // Token expiration time
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
