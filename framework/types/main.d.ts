import { IncomingMessage, ServerResponse } from "http";

declare interface Command {
	execute(req: IncomingMessage, resp: ServerResponse): void;
}

declare class FrontController {
	private routing: Record<string, Record<string, Command>>;
	register(method: Method, path: string, command?: Command): void;
	handle(req: IncomingMessage, resp: ServerResponse): void;
}

declare enum Method {
	POST = "POST",
	GET = "GET",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE",
}

export { Command, FrontController, Method };
