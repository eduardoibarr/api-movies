import "express-async-errors";

import express from "express";
import helmet from "helmet";

import { moviesRouter } from "./infra/http/routes/movies.route";
import { environment } from "./application/config/environment";
import { LogRoutes } from "./infra/http/middlewares/log-routes";
import { Logger } from "./application/config/logger";
import { limiter } from "./infra/http/middlewares/rate-limit";
import { corsConfig } from "./infra/http/middlewares/cors";
import { seriesRouter } from "./infra/http/routes/series.route";

const app = express();

const logger = new Logger().getLogger();
const logRoutes = new LogRoutes(logger);

app.use(limiter);
app.use(corsConfig);
app.use(express.json());
app.use(helmet());

app.use(logRoutes.handle.bind(logRoutes));

app.use("/movies", moviesRouter);
app.use("/series", seriesRouter);

app.listen(environment.PORT, () => {
  logger.info(`Server is running on port ${environment.PORT}`);
});
