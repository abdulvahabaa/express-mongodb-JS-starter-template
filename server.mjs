import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import os from "os";
import cluster from "cluster";
import userRoutes from "./routes/users.mjs";
import authRoutes from "./routes/auth.mjs";

dotenv.config();

const numOfCPUs = Math.min(os.cpus().length, 4);

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers based on the number of CPUs
  for (let i = 0; i < numOfCPUs; i++) {
    cluster.fork();
  }

  // Restart workers if they die
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // Setup the worker process
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Apply middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));  
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  
  const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:9000",
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
  };
  app.use(cors(corsOptions));

  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

  // Set up routes
  app.use("/user", userRoutes);
  app.use("/auth", authRoutes);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Process ID ${process.pid}: Server running on PORT ${PORT} in Dev Mode`);
  });
}
