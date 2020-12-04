import { Command } from "framework";
import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { DataE } from "./DataE";
import { sqliteDatabase } from "./SQLiteDatabase";

type modCommand = Command & { dataElement: DataE };

export class Commands {
  private readonly _dataElement: DataE;
  constructor(dataElement: DataE) {
    this._dataElement = dataElement;

    this.getAll = {
      dataElement: this._dataElement,
      execute(_: IncomingMessage, resp: ServerResponse): void {
        if (dataElement) {
          sqliteDatabase
            .select(dataElement.tableName, dataElement.primaryKeyColumn)
            .then((value) => {
              resp.writeHead(200, { "Content-Type": "application/json" });
              resp.end(JSON.stringify(value));
            })
            .catch((reason) => {
              resp.writeHead(500, { "Content-Type": "text/plain" });
              resp.end(reason.message);
            });
        }
      },
    };

    this.get = {
      dataElement: this._dataElement,
      execute(req: IncomingMessage, resp: ServerResponse): void {
        if (dataElement) {
          const url = parse(req.url ?? "", true);
          sqliteDatabase
            .select(
              dataElement.tableName,
              dataElement.primaryKeyColumn,
              [],
              url.query.id as any[]
            )
            .then((value) => {
              resp.writeHead(200, { "Content-Type": "application/json" });
              resp.end(JSON.stringify(value));
            })
            .catch((reason) => {
              resp.writeHead(500, { "Content-Type": "text/plain" });
              resp.end(reason.message);
            });
        }
      },
    };

    this.insert = {
      dataElement: this._dataElement,
      execute(req: IncomingMessage, resp: ServerResponse): void {
        if (dataElement) {
          let corpo = "";
          req.on("data", (parte) => (corpo += parte));
          req.on("end", () => {
            try {
              const inserts = JSON.parse(corpo).novo;
              sqliteDatabase
                .insert(dataElement.tableName, ...inserts)
                .then((value) => {
                  resp.writeHead(201, { "Content-Type": "text/plain" });
                  resp.end(
                    `${value} elemento(s) ${dataElement.name} adicionado(s) a ${dataElement.tableName}.`
                  );
                })
                .catch((reason) => {
                  resp.writeHead(500, { "Content-Type": "text/plain" });
                  resp.end(reason.message);
                });
            } catch (error) {
              resp.writeHead(500, { "Content-Type": "text/plain" });
              resp.end(error.message);
            }
          });
        }
      },
    };

    this.update = {
      dataElement: this._dataElement,
      execute(req: IncomingMessage, resp: ServerResponse): void {
        if (dataElement) {
          let corpo = "";
          req.on("data", (parte) => (corpo += parte));
          req.on("end", () => {
            try {
              const bodyJSON = JSON.parse(corpo);
              const updates = bodyJSON.update;
              const conditions = bodyJSON.condicao;
              sqliteDatabase
                .update(dataElement.tableName, updates, conditions)
                .then((value) => {
                  resp.writeHead(201, { "Content-Type": "text/plain" });
                  resp.end(
                    `${value} elemento ${dataElement.name} atualizado em ${dataElement.tableName}.`
                  );
                })
                .catch((reason) => {
                  resp.writeHead(500, { "Content-Type": "text/plain" });
                  resp.end(reason.message);
                });
            } catch (error) {
              resp.writeHead(500, { "Content-Type": "text/plain" });
              resp.end(error.message);
            }
          });
        }
      },
    };

    this.delete = {
      dataElement: this._dataElement,
      execute(req: IncomingMessage, resp: ServerResponse): void {
        if (dataElement) {
          let corpo = "";
          req.on("data", (parte) => (corpo += parte));
          req.on("end", () => {
            try {
              const bodyJSON = JSON.parse(corpo);
              const conditions = bodyJSON.condicao;
              sqliteDatabase
                .delete(dataElement.tableName, conditions)
                .then((value) => {
                  resp.writeHead(201, { "Content-Type": "text/plain" });
                  resp.end(
                    `${value} elemento ${dataElement.name} deletado em ${dataElement.tableName}.`
                  );
                })
                .catch((reason) => {
                  resp.writeHead(500, { "Content-Type": "text/plain" });
                  resp.end(reason.message);
                });
            } catch (error) {
              resp.writeHead(500, { "Content-Type": "text/plain" });
              resp.end(error.message);
            }
          });
        }
      },
    };
  }

  readonly getAll: modCommand;
  readonly get: modCommand;
  readonly insert: modCommand;
  readonly update: modCommand;
  readonly delete: modCommand;
}
