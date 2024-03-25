import { Witty } from "./class";
import { innitialise } from "./db";
import { Query, emitEvent } from "./events/utils";
import { windowWitty } from "./window";

windowWitty();

export { Witty, innitialise, Query, emitEvent };
