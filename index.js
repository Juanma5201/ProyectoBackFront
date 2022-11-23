require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Juanma5201:matea@cluster0.ow1kufv.mongodb.net/Cine?retryWrites=true&w=majority")
  .then(() => {
    app.listen(8080, () => console.log("Server running"));
  })
  .catch(console.log);
