const express = require('express')
const app = express()
const port = 8000

app.use(express.json())

const todoDatabase = []

/* Adds an item to the database */
app.post('/todo', (req, res) => {
    userTodoList.push(req.body.item)
    res.status(201).end()
})

/* Gets all items from the database */
app.get('/todo', (req, res) => {
    res.send(todoDatabase)
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})