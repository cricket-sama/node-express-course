console.log('Express Tutorial')
const express = require('express')
const cookieParser = require('cookie-parser')
const { products, people } = require('./data')
const peopleRouter = require('./routes/people.js')
const app = express()

const logger = (req, res, next) => {
    const method = `Method: ${req.method}\n`
    const url = `URL: ${req.url}\n`
    const time = `Date and Time: ${new Date().toLocaleString()}`
    console.log(method, url, time)
    next()
}

app.use(logger)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1/people', peopleRouter)
app.use(cookieParser())

// app.get('/', logger, (req, res) => {
//     res.send('/')
// })

// app.get('/api/v1/people', (req, res) => {
//     res.json(people)
// })

// app.post('/api/v1/people', (req, res) => {
//     const { name } = req.body
//     if (!name) {
//         return res.status(400).json({ success: false, message: 'Please provide a name'})
//     }
//     people.push({ id: people.length + 1, name: req.body.name })
//     res.status(201).json({ success: true, name: req.body.name })
// })

const auth = (req, res, next) => {
  const cookie = req.cookies.name;
  if (!cookie) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  req.user = cookie;
  next();
};

app.post('/logon', (req, res) => {
    const name = req.body.name
    if (!name) {
        return res.status(400).json({ success: false, message: 'No name found' })
    }
    res.cookie('name', name).status(201).json({success: true, message: `Hello, ${name}`})
})

app.delete('/logoff', (req, res) => {
    res.clearCookie('name').status(200).json({ success: true, message: 'Logged off'})
})

app.get('/test', auth, (req, res) => {
    res.status(200).json({ success: true, message: `Welcome, ${req.user}`})
})

app.get('/api/v1/test', (req, res) => {
    res.json({ message: 'It worked!' })
})

app.get('/api/v1/products', (req, res) => {
    res.json(products)
})

app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID)
    const product = products.find((p) => p.id === idToFind)

    if (!product) {
        return res.status(404).json({ message: 'That product was not found.' })
    }

    res.json(product)
})

app.get('/api/v1/query', (req, res) => {
    // console.log(req.query)
    const { search, limit } = req.query
    let sortedProducts = [...products]
    
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, parseInt(limit))
    }
    res.status(200).json(sortedProducts)
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>')
})

app.listen(3000, () => {
    console.log('server is listening on port 3000...')
})