const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const idadeMiddleware = (req, res, next) => {
  if (req.query.age) {
    req.age = req.query.age
    next()
  } else {
    res.redirect('/')
  }
}

app.get('/', (req, res) => {
  res.render('inicial')
})

app.post('/check', (req, res) => {
  if (req.body.age && req.body.age > 18) {
    res.redirect(`/major?age=${req.body.age}`)
  } else {
    res.redirect(`/minor?age=${req.body.age}`)
  }
})

app.get('/major', idadeMiddleware, (req, res) => {
  res.render('major', { age: req.age })
})

app.get('/minor', idadeMiddleware, (req, res) => {
  res.render('minor', { age: req.age })
})

app.listen(80, () => {
  console.log('App Running at port 80')
})
