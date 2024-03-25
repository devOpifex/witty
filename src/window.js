export const windowWitty = () => {
  if (window["witty"]) return;

  window["witty"] = {
    witty: Witty,
    innitialise: innitialise,
    Query: Query,
    emitEvent: emitEvent,
  };
};
