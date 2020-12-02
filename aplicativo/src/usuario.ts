import { IncomingMessage, ServerResponse } from 'http';
import { Command } from './Command'
import { Database } from 'sqlite3'

const db = new Database('./banco.db')

// GET /usuarios
class TodosUsuariosCommand implements Command {
  execute(req: IncomingMessage, resp: ServerResponse): void {
    db.all('SELECT * FROM usuarios', (erro, registros) => {
      resp.writeHead(200, {'Content-Type': 'application/json'})
      resp.end(JSON.stringify(registros))
    })
  }
}

export const todosUsuariosCommand = new TodosUsuariosCommand()

export const novoUsuarioCommand = { // objeto literal
  execute(req: IncomingMessage, resp: ServerResponse): void {
    let corpo = ''
    req.on('data', (parte) => corpo += parte)
    req.on('end', () => {
      const usuario = JSON.parse(corpo)
      const sql = 'INSERT INTO usuarios (nome, sobrenome) VALUES (?, ?)'
      const statement = db.prepare(sql)
      statement.run(usuario.nome, usuario.sobrenome)
      statement.finalize(() => {
        resp.writeHead(201, { 'Content-Type': 'text/plain' })
        resp.end('Usuario Criado')
      })
    })
  }
}
