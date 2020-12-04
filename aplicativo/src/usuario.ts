import { Commands } from "./commands";
import { DataE } from "./DataE";

class Usuario implements DataE {
  tableName: string = "usuarios";
  name: string = "usuario";
  primaryKeyColumn: string = "id";
  commands: Commands = new Commands(this);
}

export const usuario: Usuario = new Usuario();
