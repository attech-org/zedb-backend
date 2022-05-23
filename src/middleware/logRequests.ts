import { NextFunction, Response, Request } from "express";
import { LogRequest } from "../logger/Logger";

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  LogRequest(req);
  next();
};
export default logRequest;
