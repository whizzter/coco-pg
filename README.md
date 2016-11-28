# coco-pg

Compact Co PostgreSQL


This library is built to be a slim but succint wrapper of the pg PostgreSQL driver.
A sibling library for SQLite exists for smaller prototypes at [coco-sqlite](https://github.com/whizzter/coco-sqlite).

A simple pooled example would look something like this:
```js
let co=require("co");
let db=require("coco-pg")({database:"mydb",user:"me",password:"mypass",max:30,idleTimeoutMillis: 30000});

co(function* () {
	try {
		let result=yield db.query("SELECT data FROM tab WHERE tab.id=$1",123);
		for (let row of result.rows) {
			console.log(row.data);
		}
	} catch (excp) {
		console.error(excp.toString());
	}
});
```
