import "express-async-errors";

import express from "express";
import helmet from "helmet";

import { Logger } from "./application/config/logger";
import { environment } from "./application/config/environment";

import { LogRoutes } from "./infra/http/middlewares/log-routes";
import { limiter } from "./infra/http/middlewares/rate-limit";
import { corsConfig } from "./infra/http/middlewares/cors";

import { moviesRouter } from "./infra/http/routes/movies.route";
import { seriesRouter } from "./infra/http/routes/series.route";
import { genresRouter } from "./infra/http/routes/genres.route";
import { discoverRouter } from "./infra/http/routes/discover.route";
import { basicAuth } from "./infra/http/middlewares/auth";

const app = express();

const logger = new Logger().getLogger();
const logRoutes = new LogRoutes(logger);

app.use(limiter);
app.use(corsConfig);
app.use(express.json());
app.use(helmet());

app.use(logRoutes.handle.bind(logRoutes));

app.get("/health-check", (_, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date(),
  });
});

app.use(basicAuth);

app.use("/movies", moviesRouter);
app.use("/series", seriesRouter);
app.use("/genres", genresRouter);
app.use("/discover", discoverRouter);

app.listen(environment.PORT, () => {
  logger.info(`Server is running on port ${environment.PORT}`);
});
