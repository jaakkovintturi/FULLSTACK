const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({

    name: String,
    number: String
  
  })
  const Person = mongoose.model('Person', personSchema)
  
  const password = process.argv[2]
  const name1 = process.argv[3]
  const number1 = process.argv[4]

if (process.argv.length<3) {
  console.log('give password as an argument')
  process.exit(1)

} else if (process.argv.length < 4) {
    console.log('phonebook:')
    Person.find({}).then(result => { 
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        
        mongoose.connection.close()
    })
      })
} else {
    const person = new Person({
        name: name1,
        number: number1
    })
    person.save().then(response => {
        console.log(`added ${name1} number ${number1} to phonebook`)
        mongoose.connection.close()
      })

}
 

const url =
`mongodb+srv://JaakkoV:${password}@cluster0.wur17.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


