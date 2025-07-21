const EventEmitter = require('events')
const readline = require('readline')
const emitter = new EventEmitter()

const typeDelay = (text, delay = 200) => {
    return new Promise((resolve) => {
        let i = 0
        const interval = setInterval(() => {
            process.stdout.write(text[i])
            i++
            if (i >= text.length) {
                clearInterval(interval)
                resolve()
            }
        }, delay)
    })
}

emitter.on('start', async () => {
    process.stdout.write('James: ')
    await typeDelay('Hey, are you on your way home?\n')
    setTimeout(() => emitter.emit('morganTyping'), 2000)
})

emitter.on('morganTyping', async () => {
    process.stdout.write('Morgan: ')
    await typeDelay('. . .\r')
    process.stdout.write('Morgan: ')
    await typeDelay('. . .\r')
    process.stdout.write('Morgan: ')
    await typeDelay('. . .\r')
    setTimeout(() => emitter.emit('morganReply'), 2000)
})

emitter.on('morganReply', async () => {
    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0)
    process.stdout.write("Morgan: Yea I'm on my way. Had to stop by the grocery store\n")
    setTimeout(() => emitter.emit('jamesReply'), 2000)
})

emitter.on('jamesReply', async () => {
    process.stdout.write('James: ')
    await typeDelay('Okay. See you soon')
})

emitter.emit('start')