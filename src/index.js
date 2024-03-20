import { Witty } from "./class";
import { Query, emitEvent } from "./events/utils";

const w = new Witty();
await w.run();

const jsonRowContent = [
  { col1: 1, col2: "foo" },
  { col1: 2, col2: "bar" },
];
await w.db.registerFileText("rows.json", JSON.stringify(jsonRowContent));
await w.con.insertJSONFromPath("rows.json", { name: "rows" });

setTimeout(() => {
  emitEvent({
    id: 1,
    query: new Query().from("rows").select("col1", "col2"),
  });
  emitEvent({
    id: 2,
    query: new Query()
      .from("rows")
      .select("col1", "col2")
      .where("col1", ">", 1),
  });
}, 250);
