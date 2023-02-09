require("dotenv").config();
const morgan = require("morgan");

const express = require("express");
const clc = require("cli-color");

const connectDB = require("./configs/db");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/auth.routes");

const { PORT } = process.env || 7000;
const { NODE_ENV } = process.env;
const app = express();

if (NODE_ENV == "development") app.use(morgan("dev"));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  // process.stdout.write(clc.reset);
  console.log(
    clc.bgGreenBright(
      `Server running on http://localhost:${PORT} in ${NODE_ENV}`
    )
  );
  connectDB();
});
