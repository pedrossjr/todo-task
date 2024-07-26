const express = require('express')
//const bodyParser = require ('body-parser') 
//const os = require ('os')
const exphbs = require('express-handlebars')
const app = express()

/*
app.use (bodyParser.json ())
app.use (bodyParser.urlencoded ({extended: true}))

app.get ('/', (req, res, próximo) => { 
  res.send (os.platform ()); 
})
*/

const conn = require('./db/conn')

//const Task = require('./src/models/Task')

const taskRoutes = require('./routes/tasksRoutes')

const port = 3000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const hbs = exphbs.create({})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use('/tasks', taskRoutes)

conn
    .sync()
    .then(() => {
        app.listen(port)
    }).catch((err => console.log(err)))