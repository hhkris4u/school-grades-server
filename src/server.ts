import express from "express";
import morgan from "morgan";
import { sequelize } from "./database/database";
import { router } from "./routes/index";
import bodyParser from "body-parser";
import cors from "cors";
class AppService {
  public dbBootstraped = false;
  public app: any;
  public port: any;
  public env: any;
  public server: any;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.env = process.env.NODE_ENV;
    this.initializeApp();
  }

  public initializeApp() {
    router(this.app);
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(
      cors({
        origin: true,
        methods: "POST,GET,PUT,OPTIONS,DELETE",
      })
    );
  }

  public async initDB() {
    try {
      try {
        await sequelize.authenticate();
        console.log("Connected to database!!!!");
      } catch (err) {
        console.error("Unable to connect to the database:", err);
      }
      sequelize
        .sync()
        .then(async (data: any) => {
          this.dbBootstraped = true;
          console.log("Database Ready!!");
        })
        .catch((err: any) => console.log(err));
    } catch (e: any) {
      console.log({
        message: e.message,
        stack: e.stack,
      });
      console.log("Error bootstraping the database.");
      this.app.set("HEALTH_STATUS", "DB_MIGRATION_FAILED");
      return Promise.reject(e);
    }
  }

  public init() {
    console.log("Initializing backend-app");
    const { PORT, NODE_ENV } = process.env;

    // ENV Argument Checks
    if (!PORT || !NODE_ENV) {
      const msg =
        "Configuration Error: you must specify these ENV variables: PORT, NODE_ENV";
      console.log(msg);
      throw new Error(msg);
    }

    this.port = PORT;
    this.env = NODE_ENV;
  }

  public async start() {
    const DOCKER_HOST = "0.0.0.0";

    this.app.listen(this.port, DOCKER_HOST, (err: any) => {
      if (err) {
        this.app.set("HEALTH_STATUS", "SERVER_LISTEN_FAILED");
        throw err;
      }

      console.log(`Server started on http://${DOCKER_HOST}:${this.port}`);
    });

    if (!this.dbBootstraped) {
      await this.initDB();
    }

    this.app.set("HEALTH_STATUS", "READY");
    console.log("Initialization successful. Service is Ready.");

    // Shutdown Hook
    process.on("SIGTERM", () => {
      this.stop();
    });
    process.on("unhandledRejection", (e: any) => {
      console.log({
        message: e.message,
        stack: e.stack,
      });
      console.log("Error due to unhandledRejection.");
    });

    console.log("backend-svc: Server started!");
    return Promise.resolve();
  }

  public stop() {
    console.log("Starting graceful shutdown...");
    this.app.set("HEALTH_STATUS", "SHUTTING_DOWN");

    setTimeout(() => {
      this.app.close(() => {
        console.log("Shutdown Complete.");
        process.exit(0);
      });
    }, 3000);
  }
}

export default AppService;
