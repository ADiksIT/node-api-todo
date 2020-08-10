const { Router } = require("express");
const router = new Router();
const checkUserById = require("../checks");
const User = require("../models/User");

const changeTodo = async (req, res, field) => {
  try {
    const {id, idtodo} = req.params;
    const obj = await checkUserById(id, User);

    if (obj.status !== 200) {
      res.status(obj.status).json(obj.message);
    }

    const data = req.body[field];

    obj.candidate.todos.some(todo => {
      if (todo.id === idtodo) {
        todo[field] = data;
        return true;
      }
    })

    await obj.candidate.save();

    res.status(200).json({message: 'Todo has been change'})
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
}

router.post("/users/:id/change/completed/:idtodo", (req, res) => changeTodo(req, res, 'completed'))

router.post("/users/:id/change/text/:idtodo", (req, res) => changeTodo(req, res, 'text'))


router.post("/users/:id", async (req, res) => {
  try {
    const idUser = req.params.id;
    const obj = await checkUserById(idUser, User);

    if (obj.status !== 200) {
      res.status(obj.status).json(obj.message);
    }

    const { completed, id, text } = req.body;

    obj.candidate.todos.push({ completed, id, text });
    await obj.candidate.save();

    res.status(201).json({ message: "todo has been added" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const obj = await checkUserById(id, User);

    if (obj.status !== 200) {
      res.status(obj.status).json(obj.message);
    }

    res.status(obj.status).json(obj.candidate.todos);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

router.get("/users/:id/delete/:idtodo", async (req, res) => {
  try {
    const id = req.params.id;
    const idTodo = req.params.idtodo;

    const obj = await checkUserById(id, User);

    if (obj.status !== 200) {
      res.status(obj.status).json(obj.message);
    }

    obj.candidate.todos = await obj.candidate.todos.filter(
      (todo) => todo.id !== idTodo
    );

    await obj.candidate.save();

    res.status(obj.status).json(obj.candidate.todos);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

module.exports = router;
