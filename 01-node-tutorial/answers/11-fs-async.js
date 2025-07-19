const { writeFile } = require('fs')
console.log('Starting')

writeFile('./temporary/fileB.txt', 'Here is line 1\n', (err, result) => {
    if (err) {
        console.log('Error occured: ', err)
    } else {
        console.log('Line 1 done')

        writeFile('./temporary/fileB.txt', 'This is line 2\n', { flag: 'a' }, (err, result) => {
            if (err) {
                console.log('Error occured: ', err)
            } else {
                console.log('Line 2 done')

                writeFile('./temporary/fileB.txt', 'Finally line 3\n', { flag: 'a' }, (err, result) => {
                    if (err) {
                        console.log('Error occured: ', err)
                    } else {
                        console.log('Line 3 done')
                    }
                })
            }
        })
    }
})

console.log('The end!')
