import { Commands } from "./commands";
import { DataE } from "./DataE";

class Produto implements DataE {
  tableName: string = "produtos";
  name: string = "produto";
  primaryKeyColumn: string = "id";
  commands: Commands = new Commands(this);
}

export const produto: Produto = new Produto();
