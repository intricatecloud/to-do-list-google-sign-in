const express = require('express')
const authenticateUser = require('./authenticate-user')
const cors = require('cors')
const app = express()
const port = 8000

app.use(cors())
app.use(express.json())

const todoDatabase = {}

app.post('/todo', authenticateUser, (req, res) => {
    const userId = req.userId
    const userTodoList = todoDatabase[userId]
    if (userTodoList) {
        console.log('adding another to the list')
        userTodoList.push(req.body.item)
    } else {
        console.log('adding the first to the list for this user')
        todoDatabase[userId] = [req.body.item]
    }
    res.status(201).end()
})

app.get('/todo', authenticateUser, (req, res) => {
    console.log(todoDatabase[req.userId])
    res.send(todoDatabase[req.userId])
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})