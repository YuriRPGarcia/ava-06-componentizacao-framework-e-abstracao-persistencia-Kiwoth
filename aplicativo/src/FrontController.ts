import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { Command } from './Command'

// NOP = no operation
const NULL_COMMAND = {
  execute(req: IncomingMessage, resp: ServerResponse): void {
    resp.writeHead(204)
    resp.end()
  }
}

export class FrontController {

  private routing: Record<string, Record<string, Command>> = {}

  // registrar os comandos
  register(method: Method, path: string, command: Command = NULL_COMMAND) {
    if (!this.routing[path]) this.routing[path] = {}
    this.routing[path][method] = command
  }

  handle(req: IncomingMessage, resp: ServerResponse): void {
    const url = parse(req.url ?? '', true)
    // pathname = '/usuarios'
    if (url.pathname && this.routing[url.pathname]) {
      if (req.method && this.routing[url.pathname][req.method]) {
        const command = this.routing[url.pathname][req.method]
        try {
          command.execute(req, resp)
        } catch (e) {
          resp.writeHead(500)
          resp.end(`Server Error: ${e}`)
        }
      } else {
        resp.writeHead(405)
        resp.end(`${req.method} Not Allowed`)
      }
    } else {
      resp.writeHead(404)
      resp.end(`${url.pathname} Not Found`)
    }
  }

}

export enum Method {
  GET    = 'GET',
  POST   = 'POST',
  PUT    = 'PUT',
  DELETE = 'DELETE'
}
