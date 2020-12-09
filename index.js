
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
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
    res.json(persons)
  })
  
  app.get('/info', (request, response) => {
    let pvm = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people </p> <p> ${pvm}</p>`)
  })   

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
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
    const person = {
      id: Math.floor(Math.random() * 100),
      name: cont.name,
      number: cont.number
    }
    persons = persons.concat(person)
    persons1 = persons1.concat(cont.name)
    res.json(person)
    
  })
  const PORT = process.env.PORT || 3003
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  