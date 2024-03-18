const handlers = new Map();

export const registerHandler = (type, handler) => {
  if (type === undefined) throw new Error("type is required");
  if (handler === undefined) throw new Error("handler is required");

  if (hasHandler(type)) throw new Error("handler already exists");

  handlers.set(type, handler);
};

const hasHandler = (type) => {
  return handlers.has(type);
};

export const getHandler = (type) => {
  if (type === undefined) throw new Error("type is required");
  if (!hasHandler(type)) throw new Error("handler does not exist");

  return handlers.get(type);
};
