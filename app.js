const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const passport = require("./passport/passport");
const auth = require("./routes/auth.routes");

const app = express();

const PORT = 5000;
const MONGO_URI = "mongodb+srv://admin:admin@cluster0.ndp2g.azure.mongodb.net/todo?retryWrites=true&";

mongoose
    .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
    session({
      secret: "very secret this is",
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", auth);

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));
