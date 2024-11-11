import dotenv from "dotenv";
import { Environment } from "../../domain/models/environment";

dotenv.config();

const {
  NODE_ENV,
  PORT,
  MOVIES_API_TOKEN,
  MOVIES_API_URL,
  BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD,
} = process.env;

export const environment = {
  NODE_ENV,
  PORT,
  MOVIES_API_TOKEN,
  MOVIES_API_URL,
  BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD,
} as Environment;
