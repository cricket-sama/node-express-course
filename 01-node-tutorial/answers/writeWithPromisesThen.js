const { writeFile, readFile } = require('fs').promises

writeFile('temp.txt', 'I love to eat, eat, eat\n')
.then(() => {
    console.log('Wrote line 1!')
    return writeFile('temp.txt', 'apples and\n')
})
.then(() => {
    console.log('Wrote line 2!')
    return writeFile('temp.txt', 'bananas')
})
.then(() => {
    console.log('Wrote line 3!')
    return readFile('temp.txt', 'utf-8')
})
.then((content) => {
    console.log('Finished reading file')
    console.log(content)
})
.catch((err) => {
    console.log('An error occurred: ', err)
})