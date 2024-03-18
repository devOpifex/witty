export const emitEvent = (id, type, data) => {
  if (data === undefined) throw new Error("data is required");
  if (id === undefined) throw new Error("id is required");
  if (type === undefined) throw new Error("id is required");

  const event = new CustomEvent("witty:event", {
    detail: {
      id: id,
      type: type,
      data: data,
    },
  });
  document.dispatchEvent(event);
};
