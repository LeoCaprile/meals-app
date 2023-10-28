import Elysia from "elysia";
import { logger } from "@bogeychan/elysia-logger";
import pretty from "pino-pretty";

const stream = pretty({ colorize: true });

export const loggerPlugin = new Elysia({
	name: "@app/logger",
}).use(logger({ level: "debug", stream, autoLogging: false }));
