const { Schema, model } = require('mongoose')

const todo = new Schema({
  completed: {type: Boolean, required: true},
  text: {type: String, required: true},
  id: String,
})

const schema = new Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  todos: [todo]
})

module.exports = model('User', schema)
