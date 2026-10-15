const express = require('express'); //importieren von express
const router = express.Router();
const Todo = require('./models/todo')

//GET-Anfrage zum aufrufen aller Todos
router.get('/todos', async(req, res) => {
    const allTodos = await Todo.find();
    console.log(allTodos);
    res.send(allTodos);
});

module.exports = router;