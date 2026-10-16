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

//POST-Anfrage zum erstellen einer Todo
router.post('/todos', async (req, res ) => {
    const newTodo = new Todo({
        title: req.body.title,
        category: req.body.category,
        dueDate: req.body.dueDate
    })
    await newTodo.save();
    res.send(newTodo);
})

//DELETE-Anfrage zum löschen einer Todo
router.delete('/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        res.send(deletedTodo);

    } catch {
        res.status(404)
        res.send({error: "Todo cannot be deleted!"})
    }
})

//UPDATE-Anfrage zum aktualisieren der Daten für eine Todo
router.patch('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );

        if (!todo) {
            return res.status(404).send({error: "Todo does not exist!"})
        }
        res.send(todo);

    }catch {
        res.status(400)
        res.send({ error: "Todo cannot be updated!" })
    }
})

module.exports = router;