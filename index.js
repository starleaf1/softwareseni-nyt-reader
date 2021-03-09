const express = require('express')
const app = express()

const Article = require('./modules/Article')

app.get('/', (req, res, next) => {
  res.end("Hello, world.")
})

app.get('/articles', async (req, res, next) => {
  try {
    var articles = await Article.list(req.query.keyword, req.query.search, req.query.page)
    res.json(articles)
  } catch (e) {
    res.status(500).json({ error: e })
  }
})

app.listen(8080, function (err) {
  if (err) { console.error(err) }
  console.log('App is running. Visit http://localhost:8080')
})