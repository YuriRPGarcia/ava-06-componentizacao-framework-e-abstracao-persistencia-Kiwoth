import { Database, RunResult } from "sqlite3";

class SQLiteDatabase {
  private db = new Database("./banco.db");

  private sendStatement(query: string, valuesToAdd: any[], res: any, rej: any) {
    let changes = 0;
    const stmt = this.db
      .prepare(query, (err: Error) => {
        if (err) rej(err);
      })
      .run(...valuesToAdd, function (this: RunResult, err: Error) {
        if (err) rej(err);
        changes = this.changes;
      });
    stmt.finalize((err: Error) => {
      if (err) rej(err);
      res(changes);
    });
  }

  select(
    table: string,
    primaryKeyColumn: string,
    columns: string[] = [],
    lookupValue: number[] = []
  ): Promise<any[]> {
    return new Promise((res, rej) => {
      const columnsToLook = columns.length === 0 ? "*" : columns.join(", ");
      const whereCondition =
        lookupValue.length === 0
          ? ""
          : `WHERE${` ${primaryKeyColumn} = ? OR`
              .repeat(lookupValue.length)
              .slice(0, -2)}`;
      this.db.all(
        `SELECT ${columnsToLook} FROM ${table} ${whereCondition};`,
        lookupValue,
        (err, rows) => {
          if (err) rej(err);
          res(rows);
        }
      );
    });
  }

  insert(
    table: string,
    ...items: { [attribute: string]: any }[]
  ): Promise<number> {
    return new Promise((res, rej) => {
      const columns = Object.keys(items[0]);
      const AmmountToAdd = `(${"?,".repeat(columns.length).slice(0, -1)}),`
        .repeat(items.length)
        .slice(0, -1);
      const valuesToAdd = ([] as any[]).concat(
        ...items.map((item) => Object.values(item))
      );
      const query = `INSERT INTO ${table}(${columns.join(", ")})
      VALUES ${AmmountToAdd}`;
      this.sendStatement(query, valuesToAdd, res, rej);
    });
  }

  delete(
    table: string,
    conditions: { [attribute: string]: any }
  ): Promise<number> {
    return new Promise((res, rej) => {
      const whereCondition = Object.keys(conditions)
        .map((attribute) => `${attribute} LIKE ?`)
        .join(" AND ");
      const query = `DELETE FROM ${table} WHERE ${whereCondition}`;
      this.sendStatement(query, Object.values(conditions), res, rej);
    });
  }

  update(
    table: string,
    updates: { [attribute: string]: any },
    conditions: { [attribute: string]: any }
  ): Promise<number> {
    return new Promise((res, rej) => {
      const updatesColumns = Object.keys(updates)
        .map((attribute) => `${attribute} = ?`)
        .join(",");
      const whereCondition = Object.keys(conditions)
        .map((attribute) => `${attribute} LIKE ?`)
        .join(" AND ");
      const query = `UPDATE ${table} SET ${updatesColumns} WHERE ${whereCondition}`;
      this.sendStatement(
        query,
        Object.values(updates).concat(Object.values(conditions)),
        res,
        rej
      );
    });
  }
}

export const sqliteDatabase = new SQLiteDatabase();
