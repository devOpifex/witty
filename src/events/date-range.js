import { emitEvent } from "./utils.js";

const type = "dateRange";

export const emitDateRange = (id, from, to) => {
  if (id === undefined) throw new Error("id is required");
  if (from === undefined) throw new Error("from is required");
  if (to === undefined) throw new Error("to is required");

  emitEvent(id, type, { from: from, to: to });
};

registerHandler(type, (data) => {
  console.log(data);
});
