const express = require('express')
const { randomBytes } = require('crypto')
const app = express()

const posts = {}

app.use(express.json())

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = {
    id, title
  }

  res.status(201).send(posts[id])
})

app.listen(3001, () => { console.log('Posts server listening on 3001')})
