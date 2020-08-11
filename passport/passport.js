const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id , done) => User.findById(id, (err, user) => done(err, user)))

passport.use( new LocalStrategy({ usernameField: "login" }, async (login, password, done) => {
      try {

        const candidate = await User.findOne({ login })

        if (!candidate) {
          const newTodo = {completed: false, text: 'Add your first todo', id: Date.now().toString()}
          const newUser = new User({login, password});

          newUser.todos.push(newTodo);

          const salt = await bcrypt.genSalt(10)

          newUser.password = await bcrypt.hash(newUser.password, salt);

          await newUser.save();

          return done(null, newUser)

        } else {
          const isMatch = await bcrypt.compare(password, candidate.password);

          return isMatch ? done(null, candidate) : done(null, false, { message: "Wrong password" });

        }
      } catch (e) {
        return done(null, false, { message: e });
      }
    })
);

module.exports = passport;
