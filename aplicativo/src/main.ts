import { createServer } from 'http'
import { parse } from 'url'
import { FrontController, Method } from './FrontController'
import { todosUsuariosCommand, novoUsuarioCommand} from './usuario'

const controller = new FrontController()

controller.register(Method.GET, '/nada')
controller.register(Method.GET, '/usuarios', todosUsuariosCommand)
controller.register(Method.POST, '/usuarios', novoUsuarioCommand)

const server = createServer((req, resp) => controller.handle(req, resp))
server.listen(9999, () => {
  console.log('Server running at http://localhost:9999')
})

