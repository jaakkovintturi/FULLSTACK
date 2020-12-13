require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())


const Person = require('./models/person.js')

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
app.use(cors())
app.use(express.static('build'))

// must parse body before morganBody as body will be logged
// hook morganBody to express app


let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523",
    },

    {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
      },
    {
      id: 4,
      name: "Mary Poppendick",
      number: "30-23-6423122",
    },

    {
      id: 5,
      name: "Essi Esimerkki",
      number: "30-23-6423122"
    }

  ] 
  let persons1 = persons 

   app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons)
    })
  })
  
  app.get('/info', (request, response) => {
    let pvm = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people </p> <p> ${pvm}</p>`)
  })   

  app.get('/api/persons/:id', (req, res) => {
   Person.findById(req.params.id).then(pers => {
    if (pers) {
        res.json(pers)
      } else {
        res.status(404).end()
      }
    })
  })

    app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(p => p.id !== id)
      
        response.status(204).end()
      })

  app.post('/api/persons', (req, res) => {
    const cont = req.body
    persons1 = persons.map(n => n.name)
    console.log(cont)
    if (!cont.name || !cont.number ) {
      console.log(cont.name)
      return res.status(400).json({ 
        error: 'crucial information missing' 
      })
    }
   
    else if(persons1.includes(cont.name)) {
      console.log(cont.name)
      return res.status(400).json({ 
        error: 'name must be unique' 
      })
    }
    const person = new Person({
      id: Math.floor(Math.random() * 100),
      name: cont.name,
      number: cont.number
    })
  
    persons1 = persons1.concat(cont.name)
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    
  })
  const PORT = process.env.PORT 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  