const jwt = require('jsonwebtoken')

const logonController = (req, res) => {
    const { name, password } = req.body
    if (!name || !password) {
        throw new Error('Please enter username and password')
    }
    const token = jwt.sign({ name }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    })
    res.status(200).json({ msg: 'user created', token})
}

const helloController = (req, res) => {
    res.status(200).json({ msg: `Hello, ${req.user.name}! Nice to see you`})
}

module.exports = { logonController, helloController }