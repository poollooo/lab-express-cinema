// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config')

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')
const Movie = require('./models/Movie.model')


const app = express()
app.use(express.json())

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app)

// default value for title local
const projectName = 'lab-express-cinema'
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase()

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`

// 👇 Start handling routes here
const router = require('./routes/index')
app.use('/', router)

router.get('/movies', async (req, res) => {
  const allMovies = await Movie.find().select('title director')
  res.json(allMovies)
})

router.get('/movies/:id', async (req, res) => {
  const movieById = await Movie.findById(req.params.id)
  res.json({ movieById })
})

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
