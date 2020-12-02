# Avaliação #06 Componentização do Framework e Abstração da Persistência

**Classroom:** <https://classroom.github.com/a/nqUnvg8o>

Componentizar o _framework_(izinho) criado para o aplicativo, movendo [FrontController.ts](aplicativo/src/FrontController.ts) e [Command.ts](aplicativo/src/Command.ts) de [./aplicativo/](aplicativo/) para um novo projeto na pasta [./framework/](framework) e referenciando-os no aplicativo (ver <https://github.com/aps-2020-2-apnp/aula-06-dry-componentes-biblioteca-framework-template-method>).

Abstrair a camada de persistência de modo que a conexão com o banco, comandos _sql_ e detalhes de implementação do _sqlite_ não sejam mencionados nos arquivos [usuario.ts](aplicativo/src/usuario.ts) e [produto.ts](aplicativo/src/produto.ts).

Terminar de implementar [produto.ts](aplicativo/src/produto.ts).

## Desafio

Abstrair a persistência ao ponto de identificar a **classe/objeto**, se _Usuario_ ou _Produto_, ou outra, e executar os comandos de seleção, inclusão e exclusão com o mínimo de configuração e código repetido.
