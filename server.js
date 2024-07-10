"use strict";

const app = require("./src/app");
const { PORT } = require("./src/config");

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
