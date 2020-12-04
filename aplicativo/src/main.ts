import { createServer } from "http";
import { FrontController, Method } from "framework";
import { produto } from "./produto";
import { usuario } from "./usuario";

const controller = new FrontController();

// Para SELECT de todos:
// localhost:9999/produtos

// Para SELECT de 1 ou n
// localhost:9999/produto?id=1&id=3

// Para INSERT de 1 ou n
// localhost:9999/produto POST Body JSON:
// {
// 	"novo": [
// 		{
// 			"descricao": "Macarrão com Ovos Parafuso 500g ADRIA",
// 			"preco": "2.49"
// 		},
// 		{
// 			"descricao": "Macarrão com Ovos Penne 500g RENATA",
// 			"preco": "2.79"
// 		}
// 	]
// }

// Para UPDATE de 1
// localhost:9999/produto PUT/PATCH  Body JSON:
// {
// 	"update": {
// 		"descricao": "Feijão Carioca 1kg KICALDO"
// 	},
// 	"condicao": {
// 		"descricao": "Feijão Carioc 1kg KICALDO"
// 	}
// }

// Para DELETE de 1
// localhost:9999/produto DELETE  Body JSON:
// {
// 	"condicao": {
// 		"descricao": "Feijão Carioca 1kg KICALDO"
// 	}
// }

controller.register(Method.GET, "/produtos", produto.commands.getAll);
controller.register(Method.GET, "/produto", produto.commands.get);
controller.register(Method.POST, "/produto", produto.commands.insert);
controller.register(Method.PATCH, "/produto", produto.commands.update);
controller.register(Method.PUT, "/produto", produto.commands.update);
controller.register(Method.DELETE, "/produto", produto.commands.delete);

controller.register(Method.GET, "/usuarios", usuario.commands.getAll);
controller.register(Method.GET, "/usuario", usuario.commands.get);
controller.register(Method.POST, "/usuario", usuario.commands.insert);
controller.register(Method.PATCH, "/usuario", usuario.commands.update);
controller.register(Method.PUT, "/usuario", usuario.commands.update);
controller.register(Method.DELETE, "/usuario", usuario.commands.delete);

const server = createServer((req, resp) => controller.handle(req, resp));
server.listen(9999, () => {
  console.log("Server running at http://localhost:9999");
});
