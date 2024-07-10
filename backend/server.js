"use strict";

const app = require("./src/App");
const { PORT } = require("./src/config");

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
