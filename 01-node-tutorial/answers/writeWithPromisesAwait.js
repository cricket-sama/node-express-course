const { writeFile, readFile } = require('fs').promises;

const writer = async () => {
    try {
        await writeFile('temp.txt',
            'The mitochondira is the powerhouse of the cell. \nSecond line.\nThird line!')
        console.log('Write done')
    } catch (err) {
        console.log('An error occurred while writing: ', err)
    }
}

const reader = async () => {
    try {
        const content = await readFile('temp.txt', 'utf-8')
        console.log(content)
    } catch (err) {
        console.log('An error occurred while reading: ', err)
    }
}

const readWrite = async () => {
    await writer()
    await reader()
}

readWrite()