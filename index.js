const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')
const app = express()

const posts = {}

app.use(express.json())
app.use(cors({ origin: true }))

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = {
    id, title
  }

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: posts[id]
  })

  res.status(201).send(posts[id])
})

app.listen(4000, () => { console.log('Posts server listening on 4000')})
