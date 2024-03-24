# Witty

## Example

```js
initialise()
    .then((params) => {
        const jsonRowContent = [
          { col1: 1, col2: "foo" },
          { col1: 2, col2: "bar" },
        ];
        await params.db.registerFileText("rows.json", JSON.stringify(jsonRowContent));
        await params.con.insertJSONFromPath("rows.json", { name: "rows" });

        const w = new Witty(params)

        emitEvent({
          id: 1,
          query: new Query().from("rows").select("col1", "col2"),
        });

        emitEvent({
          id: 2,
          query: new Query().from("rows").select("col1", "col2").where("col1", ">", 1),
        });

        w.on((data) => {
          console.info(data);
        });
    })
```
