import { getConnection, getDB } from "./db";
import { getHandler } from "./events/handlers";

export class Witty {
  #db = null;
  #connection = null;

  constructor() {
    this.#db = getDB();
    this.#connection = getConnection();
  }

  get db() {
    return this.#db;
  }

  get connection() {
    return this.#connection;
  }

  run() {
    document.addEventListener("witty:event", (event) => {
      console.log(event);
      const handler = getHandler(event.detail.type);
      console.log(handler);
      handler(event.detail);
    });
  }
}
