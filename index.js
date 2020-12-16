require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
app.use(cors())

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
  
  app.get('/api/info', (request, response) => {
    Person.find({}).then(persons => {
      let count = persons.length
      let date = new Date()
      response.send('<p>Phonebook has info for for ' + count + ' people <br> ' + date + '<p>')
    })
  })

  app.get('/api/persons/:id', (req, res, next) => {
   Person.findById(req.params.id).then(pers => {
    if (pers) {
        res.json(pers)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
    })


    app.delete('/api/persons/:id', (req, res, next) => {
      Person.findByIdAndRemove(req.params.id)
       .then(result => {
         res.status(204).end()
       })
       .catch(error => next(error))
      })

  app.post('/api/persons', (req, res, next) => {
    const cont = req.body
    console.log(cont)

   /*Person.findOne({name: cont.name}).then(pers => {
    if(pers) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    })*/
  const person = new Person({
    name: cont.name,
    number: cont.number,
    id: Math.floor(Math.random()*1000),
  })
  person
  .save()
  .then(savedPerson =>  savedPerson.toJSON())
  .then(savedAndFormattedPerson => {
    res.json(savedAndFormattedPerson)
  })
  .catch(error => next(error))
  
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = { 
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random()*1000),
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })


  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }  else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
  }
  
  app.use(errorHandler)

  const PORT = process.env.PORT 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  