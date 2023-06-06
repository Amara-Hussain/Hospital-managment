const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();

const port = process.env_PORT || 3000;
app.listen(port, () => console.log(`you are listining on ${port}`));
