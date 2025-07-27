console.log('Express Tutorial')
const express = require('express')
const { products } = require('./data')
const app = express()

app.use(express.static('./public'))

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