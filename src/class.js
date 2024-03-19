import { getConnection, getDB } from "./db";

export class Witty {
  #db = null;
  #connection = null;
  #handlers = new Map();

  constructor() {
    this.#db = getDB();
    this.#connection = getConnection();
    this.#registerStandardHandlers();
  }

  get db() {
    return this.#db;
  }

  get connection() {
    return this.#connection;
  }

  #registerStandardHandlers = () => {
    this.registerHandler("dateRange", (data) => {
      console.log(data);
    });
  };

  #hasHandler = (type) => {
    return this.#handlers.has(type);
  };

  registerHandler = (type, handler) => {
    if (type === undefined) throw new Error("type is required");
    if (handler === undefined) throw new Error("handler is required");

    if (this.#hasHandler(type))
      throw new Error(`handler already exists for type: ${type}`);

    this.#handlers.set(type, handler);
  };

  #getHandler = (type) => {
    if (type === undefined) throw new Error("type is required");
    if (!this.#hasHandler(type))
      throw new Error(`handler does not exist for type: ${type}`);

    return this.#handlers.get(type);
  };

  run() {
    document.addEventListener("witty:event", (event) => {
      const handler = this.#getHandler(event.detail.type);
      handler(event.detail);
    });
  }
}
