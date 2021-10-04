import db from "./config/database.config";
import app from "./app";

db.sync().then(() => {
  console.log("db connected");
});

const port = 9000;

app.listen(port, () => {
  console.log("server is running");
});
