let users = require('../mocks/users.js')

function listUsers(req, res) {
    const { order } = req.query
    const sortedUsers = users.sort((a, b) => {
        if (order === 'desc') {
            return a.id < b.id ? 1 : -1
        }

        return a.id > b.id ? 1 : -1
    })

    res.send(200, sortedUsers)
}

function getUserById(req, res) {
    const { id } = req.params
    const user = users.find((user) => user.id === Number(id))

    if (!user) {
        return res.send(400, { errorMessage: 'User not found' })

    }

    res.send(200, user)
}

function createUser(req, res) {
    const { body } = req

    const lastUserId = users[users.length - 1].id

    // Verifica se o cpf é um numero
    if (!isNumeric(body.cpf)) {
        return res.status(400).json({ errorMessage: 'Invalid CPF format' })
    }
    
    const newUser = {
        id: lastUserId + 1,
        cpf: body.cpf,
        name: body.name,
        birthDate: body.birthDate
    }

    users.push(newUser)
    res.send(200, {
        message: "New user added successfully",
        newUser
    })
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}

function updateUser(req, res) {
    const { id } = req.params
    const { cpf, name, birthDate } = req.body

    const userExists = users.find((user) => user.id === Number(id))

    if (!userExists) {
        return res.send(400, { errorMessage: 'User not found' })

    }

    users = users.map((user) => {
        if (user.id === Number(id)) {
            return ({
                ...user,
                cpf: cpf,
                name: name,
                birthDate: birthDate,
            })
        }

        return user
    })

    res.send(200, { id: Number(id), cpf: cpf, name: name, birthDat: birthDate })
}

function deleteUser(req, res) {
    const { id } = req.params

    users = users.filter((user) => user.id !== Number(id))
    res.send(200, { userDelete: true })
}

module.exports = { listUsers, getUserById, createUser, updateUser, deleteUser }