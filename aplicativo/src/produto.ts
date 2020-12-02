import { IncomingMessage, ServerResponse } from 'http';
import { Command } from './Command'
import { Database } from 'sqlite3'

const db = new Database('./banco.db')

// GET /produtos
class TodosProdutosCommand implements Command {
  execute(req: IncomingMessage, resp: ServerResponse): void {
    db.all('SELECT * FROM produtos', (erro, registros) => {
      resp.writeHead(200, {'Content-Type': 'application/json'})
      resp.end(JSON.stringify(registros))
    })
  }
}

export const todosUsuariosCommand = new TodosProdutosCommand()
