const { createReadStream } = require('fs')

const stream = createReadStream('../content/big.txt', { encoding: 'utf-8', highWaterMark: 200})

let count = 0

stream.on('data', (chunk) => {
    count++
    console.log(`Chunk #${count}:`)
    console.log(chunk)
    console.log('...')
})

stream.on('end', () => {
    console.log(`Stream completed. Total chunks: ${count}`)
})

stream.on('error', (err) => {
    console.error('Error occurred: ', err)
})
