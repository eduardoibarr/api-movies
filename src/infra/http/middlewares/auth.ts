import { Request, Response, NextFunction } from "express";
import { environment } from "../../../application/config/environment";

export const basicAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const username = environment.BASIC_AUTH_USERNAME;
  const password = environment.BASIC_AUTH_PASSWORD;

  if (!username || !password) {
    next(
      new Error(
        "Basic authentication credentials are not set in the environment variables."
      )
    );
    return;
  }

  const authHeader = req.headers.authorization;

  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.set("WWW-Authenticate", 'Basic realm="Protected Area"');
    res
      .status(401)
      .json({ message: "Authentication required", statusCode: 401 });
    return;
  }

  const base64Credentials = authHeader.split(" ")[1];
  const decodedCredentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [inputUsername, inputPassword] = decodedCredentials.split(":");

  if (inputUsername === username && inputPassword === password) {
    next();
  } else {
    res.set("WWW-Authenticate", 'Basic realm="Protected Area"');
    res.status(401).json({ message: "Invalid credentials", statusCode: 401 });
  }
};
