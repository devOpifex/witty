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

  async run() {
    document.addEventListener("witty:event", (event) => {
      this.#data[event.detail.id] = event.detail;
      this.#query = buildQuery(this.#data);
      console.log(this.#query);
      this.#connection.query(this.#query).then((data) => {
        console.log("data", JSON.parse(JSON.stringify(data.toArray())));
        this.#connection.close();
      });
    });
  }
}
