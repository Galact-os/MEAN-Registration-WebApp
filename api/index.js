import express from "express";
import routes from "./src/routes/userRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

//Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/usersDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get("/", (rq, res) => {
  res.send(`Node and express server running on port: ${PORT}`);
});

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
