// sistema de modulos de commons.js
// Importo la dependencia
const express = require('express')
const logger = require('./loggerMiddleware')
const cors = require('cors')

// Inicializo express
const app = express()

// Para usar el modulo de body-parser
// 'Middleware' o interceptor
app.use(express.json())

// middleware CORS
app.use(cors())

// Nuestro middleware
app.use(logger)
let notes = [
  {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse HOMMME',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hellllllloooo</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  // Los param son siempre string, si oq ue buscamos es otro tipo ncesitamos trasaformarlo
  const id = Number(request.params.id)
  console.log({ id })
  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
    response.status(200).end()
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  // Los param son siempre string, si oq ue buscamos es otro tipo ncesitamos trasaformarlo
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)
  if (!note || !note.body) {
    return response.status(400).json({
      error: 'note.body is missing'
    })
  }
  // Obtenemos array de identificadores
  const ids = notes.map((note) => note.id)
  // Cojo el maximo del array
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    body: note.body,
    title: note.title,
    userId: 1
  }
  notes = notes.concat(newNote)
  response.status(201).json(newNote).end()
})

app.use((request, response) => {
  console.log('ddddd')
  response.status(404).json({
    error: 'Cagadon'
  })
})

// Para Heroku
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})
