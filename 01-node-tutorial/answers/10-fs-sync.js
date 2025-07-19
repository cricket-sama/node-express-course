const { readFileSync, writeFileSync } = require('fs')
console.log('start')

writeFileSync('./temporary/fileA.txt', 'Line 1\n')
writeFileSync('./temporary/fileA.txt', 'Now for line 2 here\n', { flag: 'a' })
writeFileSync('./temporary/fileA.txt', 'Finally here is line 3\n', { flag: 'a' })

const content = readFileSync('./temporary/fileA.txt', 'utf-8')
console.log(content)