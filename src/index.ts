import "express-async-errors";

import express from "express";
import helmet from "helmet";

import { moviesRouter } from "./infra/http/routes/movies.route";
import { environment } from "./application/config/environment";
import { LogRoutes } from "./infra/http/middlewares/log-routes";
import { Logger } from "./application/config/logger";

const app = express();

const logger = new Logger().getLogger();
const logRoutes = new LogRoutes(logger);

app.use(express.json());
app.use(helmet());
app.use(logRoutes.handle.bind(logRoutes));
app.use("/movies", moviesRouter);

app.listen(environment.PORT, () => {
  logger.info(`Server is running on port ${environment.PORT}`);
});
