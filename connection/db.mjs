import { Db, MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = `${process.env.MONGO_DB_URI}`;
let client;

const connectToDatabase = async () => {
  if (client != null) {
    console.log("\n\n", "Process ID", process.pid, "Using Cached Connection");
    return client.db();
  }
  console.log(
    "Process ID",
    process.pid,
    "Using New Connection",
    new Date(),
    "\n"
  );
  client = await MongoClient.connect(MONGODB_URI, {
    compressors: "zstd",
    maxPoolSize: 6,
  });

  return client.db();
};

export default connectToDatabase;
