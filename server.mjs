import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import * as os from "os";
import cluster from "cluster";
import userRoutes from "./routes/users.mjs";
import authRoutes from "./routes/auth.mjs";

dotenv.config();

const numOfCPUs = os.cpus().length < 4 ? os.cpus().length : 4;

// For Master process
if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numOfCPUs; i++) {
    cluster.fork();
  }

  // This event is first when worker died
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log("Forking another worker!");
    cluster.fork();
  });
} else {
  // For Worker
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const app = express();

  const corsOptions = {
    origin: "http://localhost:9000",
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
  };

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(cors(corsOptions));

  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(
      "Process ID",
      process.pid,
      `: Backend Server listening on PORT ${PORT} in Dev Mode`
    );
  });

  // app.get("/", (req,res) => {
  //     res.send("Hello world")
  // })

  // app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
}
