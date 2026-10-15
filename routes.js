const express = require('express'); //importieren von express
const router = express.Router();
const Todo = require('./models/todo')

//GET-Anfrage zum auslesen aller Todos
router.get('/todos', async(req, res) => {
    const allTodos = await Todo.find();
    console.log(allTodos);
    res.send(allTodos);
});

//GET-Anfrage zum auslesen von einer Todo
router.get('/todos/:id', async (req, res) => {
    try {
        const todo = await  Todo.findOne({_id: req.params.id});
        console.log('parameter: ', req.params);
        res.status(200)
        res.send(todo);
    } catch {
        res.status(404);
        res.send({error: "Todo does not exist!"})
    }
    })

//GET-Anfrage zum auslesen aller Categorien
router.get('/categories', async (req, res) => {
    const allCategories = Todo.schema.path('category').enumValues;
    console.log(allCategories);
    res.send(allCategories);
})

module.exports = router;