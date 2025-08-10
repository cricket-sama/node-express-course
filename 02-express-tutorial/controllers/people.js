const { people } = require('../data')

const getPeople = (req, res) => {
    res.json(people)
}

const addPerson = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, message: 'Please provide a name'})
    }
    people.push({ id: people.length + 1, name: req.body.name })
    res.status(201).json({ success: true, name: req.body.name })
}

const personId = (req, res) => {
    const id = parseInt(req.params.id)
    const person = people.find(p => p.id === id)
    if (!person) {
        return res.status(404).json({ success: false, message: 'Person not found' })
    }
    res.status(200).json({ success: true, person })
}

const updatePerson = (req, res) => {
    const id = parseInt(req.params.id)
    const { name } = req.body
    const person = people.find(p => p.id === id)
    if (!person) {
        return res.status(404).json({ success: false, message: 'Person not found' })
    }
    person.name = name
    res.status(200).json({ success: true, updated: person })
}

const deletePerson = (req, res) => {
    const id = parseInt(req.params.id)
    const person = people.find(p => p.id === id)
    if (!person) {
        return res.status(404).json({ success: false, message: 'Person not found' })
    }
    people.filter(p => p.id !== id)
    res.status(200).json({ success: true, deleted: person })

}

module.exports = { getPeople, addPerson, personId, updatePerson, deletePerson }