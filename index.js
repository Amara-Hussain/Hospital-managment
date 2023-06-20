const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./routes/association")();

const port = process.env.PORT || 1122;
app.listen(port, () => console.log(`you are listining on ${port}`));
