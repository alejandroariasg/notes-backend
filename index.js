const express = require('express')
const cors = require('cors')
const logger = require('./logerMiddleware')

const app = express()

//Extension mecesaria para poder recibir JSON
app.use(express.json())
app.use(cors())

app.use(logger)

let notes = [
    {
        "id": 1,
        "content": "Me tengo que suscribir a (midudev en YouTube y Twitch",
        "date": "2019-05-30T17:30:31.098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Tengo que estudiar las clases del FullStack Bootcamp",
        "date": "2019-05-30T18:39:34.0912",
        "important": false
    },
    {
        "id": 3,
        "content": "Repasar los retos de JS de midudev",
        "date": "2019-05-30T19:20:14.2982*",
        "important": true
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const note = req.body // 
    
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)
    
    const newNote = {
        id : maxId + 1,
        content: note.content,
        important: note.important || false,
        date: new Date().toISOString()
    }
    //notes = notes.concat(newNote)
    notes = [...notes, newNote]
    res.status(201).json(newNote)
})

app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found' 
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

   