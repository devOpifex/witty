export const emitEvent = (opts) => {
  if (opts.id === undefined) throw new Error("id is required");
  if (opts.query === undefined) throw new Error("query is required");

  const event = new CustomEvent("witty:event", {
    detail: {
      id: opts.id,
      query: opts.query.data,
    },
  });
  document.dispatchEvent(event);
};

const type = (type, index) => {
  return {
    name: type,
    index: index,
  };
};

export class Query {
  #data = [];

  constructor() {}

  get data() {
    return this.#data;
  }

  select(...variables) {
    this.#data.push({
      type: type("select", 0),
      variable: variables,
    });
    return this;
  }

  from(table) {
    this.#data.push({
      type: type("from", 1),
      table: table,
    });
    return this;
  }

  join(type, table, variable1, variable2) {
    this.#data.push({
      type: type("join", 2),
      joinType: type,
      table: table,
      variable1: variable1,
      variable2: variable2,
    });
    return this;
  }

  where(variable, operator, value) {
    this.#data.push({
      type: type("where", 3),
      variable: variable,
      operator: operator,
      value: value,
    });
    return this;
  }

  order(variable, ascending = true) {
    this.#data.push({
      type: type("order", 4),
      variable: variable,
      ascending: ascending,
    });
    return this;
  }

  group(variable) {
    this.#data.push({
      type: type("group", 5),
      variable: variable,
    });
    return this;
  }
}

const objToArr = (obj) => {
  const arr = [];
  for (const [_key, value] of Object.entries(obj)) {
    arr.push(value.query);
  }
  return arr.flat();
};

const querySorter = (a, b) => {
  if (a.type.index < b.type.index) return -1;
  if (a.type.index > b.type.index) return 1;
  return 0;
};

const ensureAllFromSameTable = (data) => {
  const tables = data.filter((item) => item.type.name === "from");
  if (tables.length === 0) return false;
  const table = tables[0].table;
  return tables.every((item) => item.table === table);
};

const getVariables = (data) => {
  return Array.from(
    new Set(
      data
        .filter((q) => q.variable !== undefined)
        .map((q) => q.variable)
        .flat(),
    ),
  );
};

const getFrom = (data) => {
  return data.filter((item) => item.type.name === "from")[0].table;
};

const removeType = (data, type) => {
  return data.filter((item) => item.type.name !== type);
};

export const buildQuery = (data) => {
  if (data === undefined) throw new Error("data is required");

  data = objToArr(data);
  data = data.sort(querySorter);

  const allFromSame = ensureAllFromSameTable(data);

  if (!allFromSame) throw new Error("all `from` must be the same table");

  const variables = getVariables(data);
  data = removeType(data, "select");

  const query = data.reduce((acc, item) => {
    switch (item.type.name) {
      case "where":
        return `${acc} WHERE ${item.variable} ${item.operator} ${item.value}`;
      case "order":
        return `${acc} ORDER BY ${item.variable} ${
          item.ascending ? "ASC" : "DESC"
        }`;
      case "join":
        return `${acc} ${item.joinType} JOIN ${item.table} ON ${item.variable1} = ${item.variable2}`;
      case "group":
        return `${acc} GROUP BY ${item.variable}`;
      case "from":
        return acc;
      default:
        throw new Error(`unknown type: ${item.type.name}`);
    }
  }, "");

  return `SELECT ${variables.join(", ")} FROM ${getFrom(data)} ${query};`;
};
