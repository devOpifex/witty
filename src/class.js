import { getConnection, getDB } from "./db";
import { buildQuery } from "./events/utils";

export class Witty {
  #db = null;
  #react = true;
  #connection = null;
  #data = {};
  #query = null;

  constructor(react = true) {
    this.#db = getDB();
    this.#react = react;
    this.#connection = getConnection();
  }

  get db() {
    return this.#db;
  }

  get con() {
    return this.#connection;
  }

  run() {
    document.addEventListener("witty:event", (event) => {
      this.#data[event.detail.id] = event.detail;
      this.#query = buildQuery(this.#data);
      console.log(this.#query);
    });
  }
}
