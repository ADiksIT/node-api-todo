const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const passport = require('./passport/passport');

const app = express();

const MONGO_URI =
  'mongodb+srv://admin:admin@cluster0.ndp2g.azure.mongodb.net/todo?retryWrites=true&';

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(console.log(`MongoDB connected ${MONGO_URI}`))
  .catch((err) => console.log(err));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'very secret this is',
    resave: false,
    key: 'user_sid',
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 120 * 3600,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/todos', require('./routes/todos.router'));

app.listen(() => console.log(`Backend listening on port!`));
