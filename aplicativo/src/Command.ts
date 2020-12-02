import { IncomingMessage, ServerResponse } from "http";

export interface Command { // command design pattern
  execute(req: IncomingMessage, resp: ServerResponse): void
}
