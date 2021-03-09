const express = require('express')
const app = express()

const Article = require('./modules/Article.js')
const Book = require('./modules/Book.js')

app.get('/', (req, res, next) => {
  res.end("Hello, world.")
})

app.get('/articles', async (req, res) => {
  try {
    var articles = await Article.list(req.query.keyword, req.query.search, req.query.page)
    var respBody = {
      status: "ok",
      articles: articles,
      reqCompletedAt: new Date()
    }
    res.json(respBody)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e, reqCompletedAt: new Date() })
  }
})

app.get('/books/:listName', async (req, res, next) => {
  try {
    let books = await Book.list(req.params.listName)

    var respBody = {
      status: 'ok',
      books: books,
      reqCompletedAt: new Date()
    }

    res.json(respBody)
  } catch (e) {
    console.error(e)
    if (e.message === 'not-found') {
      res.status(404).json({
        error: 'not-found',
        message: `There's no list named ${req.params.listName}.`,
        reqCompletedAt: new Date()
      })
    }
    res.status(500).json({ error: e, reqCompletedAt: new Date() })
  }
})

app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(8080, function (err) {
  if (err) { console.error(err) }
  console.log('App is running. Visit http://localhost:8080')
})