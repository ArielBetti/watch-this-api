require("dotenv").config();
var cors = require("cors");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var userRegisterRouter = require("./routes/register");
var userLoginRouter = require("./routes/login");
var userLogoutRouter = require("./routes/logout");
var createListRouter = require("./routes/createList");
var getListRouter = require("./routes/getList");
var getUserListsRouter = require("./routes/getUserList");
var putUserListRouter = require("./routes/putUserList");
var deleteUserListRouter = require("./routes/deleteUserList");

var app = express();

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = [process.env.CORS_ALLOWED_ORIGIN];

const options = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/register", userRegisterRouter);
app.use("/login", userLoginRouter);
app.use("/logout", userLogoutRouter);
app.use("/create-list", createListRouter);
app.use("/get-list", getListRouter);
app.use("/get-user-lists", getUserListsRouter);
app.use("/put-user-list", putUserListRouter);
app.use("/delete-user-list", deleteUserListRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: "error", error: err });
});

module.exports = app;
