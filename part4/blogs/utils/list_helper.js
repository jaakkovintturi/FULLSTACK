var _ = require('lodash')
// Load the core build.

const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  console.log(array.length)
  if(array.length === 0) {
    return 0
  } else if(array.length === 1) {
    return Number(array[0].likes)
  } else {
    let counter = 0
    for(i=0; i<array.length; i++) {
      counter = counter + array[i].likes
    }
    return counter
  }
}

const favoriteBlog = (array) => {
  const top = array
  const help = top.map(x => Number(x.likes)).sort((a,b) => b-a)[0]
  const right = array.find(x => x.likes === help)

  const json = {
    title: right.title,
    author: right.author,
    likes: right.likes
  }

  return json
}

const mostBlogs = (array) => {
  const top = array
  const numberOf = _.map(_.countBy(top, 'author'), (val, key) => ({ author: key, blogs: val }))
  console.log(numberOf[2])

  const json = {
    author: numberOf[2].author,
    blogs: numberOf[2].blogs
  }

  return json
}

const mostLikes = (array) => {
  const top = array
  let compare = 0
  let counter1 = 0
  let name = null
  for(i=0; i<top.length; i++) {
    let counter = 0
    counter1 = counter1 + 1
    for(a=0; a<top.length; a++) {
      if(top[i].author === top[a].author)
        counter = counter + top[a].likes
    } if(counter >= compare) {
      compare = counter
      name = top[counter1].author
    }
  }
  const json = {
    author: name,
    likes: compare
  }
  return json
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}