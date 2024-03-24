import { Witty } from "./class";
import { innitialise } from "./db";
import { Query, emitEvent } from "./events/utils";

const windowWitty = () => {
  if (window["witty"]) return;

  window["witty"] = {
    witty: Witty,
    innitialise: innitialise,
    Query: Query,
    emitEvent: emitEvent,
  };
};

windowWitty();
