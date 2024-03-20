import { getConnection, getDB } from "./db";
import { buildQuery } from "./events/utils";

export class Witty {
  #db = null;
  #data = null;
  #react = true;
  #connection = null;
  #events = {};
  #query = null;
  #listeners = [];

  #callback() {
    if (this.#data === null) return;
    if (this.#data === undefined) return;
    this.#listeners.forEach((listener) => listener(this.#data));
  }

  constructor(react = true) {
    this.#db = getDB();
    this.#react = react;
    this.#connection = getConnection();

    if (!react) return this;

    this.#callback();
  }

  get db() {
    return this.#db;
  }

  get con() {
    return this.#connection;
  }

  get data() {
    return this.#data;
  }

  on(callback) {
    if (callback === undefined) throw new Error("Must pass a callback");
    if (typeof callback !== "function")
      throw new Error("Callback must be a function");

    this.#listeners.push(callback);

    if (!this.#react) return this;

    callback();
    return this;
  }

  async run() {
    document.addEventListener("witty:event", (event) => {
      this.#events[event.detail.id] = event.detail;
      this.#query = buildQuery(this.#events);

      this.#connection.query(this.#query).then((data) => {
        this.#data = JSON.parse(JSON.stringify(data.toArray()));
        this.#connection.close();

        if (this.#react) {
          this.#callback(this.#data);
        }
      });
    });
  }
}
