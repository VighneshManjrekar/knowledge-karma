require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const express = require("express");
const clc = require("cli-color");

const connectDB = require("./configs/db");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/auth.routes");
const resRouter = require("./routes/res.routes");
const adminRouter = require("./routes/admin.routes");

const { PORT } = process.env || 7000;
const { NODE_ENV } = process.env;
const app = express();
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

if (NODE_ENV == "development") app.use(morgan("dev"));

app.use(express.json());
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/resources", resRouter);
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});
app.use(errorHandler);

app.listen(PORT, () => {
  if (NODE_ENV == "production") process.stdout.write(clc.reset);
  console.log(
    clc.black.bgGreenBright(
      `Server running on http://localhost:${PORT} in ${NODE_ENV}`
    )
  );
  connectDB();
});
