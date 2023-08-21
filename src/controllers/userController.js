let users = require('../mocks/users.js')


function isNumeric(value) {
    return /^\d+$/.test(value);
}

function cpfExists(cpf) {
    return users.find((user) => user.cpf === Number(cpf))
}

function isValidDateFormat(date) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(date);
}

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
        return res.send(400, { errorMessage: 'Invalid CPF format' })
    }

    // Verifica se ja existe um cpf para esse usuario
    if (cpfExists(body.cpf)) {
        return res.send(400, { errorMessage: 'CPF already exists' })
    }

    // Verifica se a data esta em um formato valido
    if (!isValidDateFormat(body.birthDate)) {
        return res.send(400, { errorMessage: 'Invalid birthDate format' })
    }

    const newUser = {
        id: lastUserId + 1,
        cpf: parseInt(body.cpf),
        name: body.name,
        birthDate: body.birthDate
    }

    users.push(newUser)
    res.send(200, {
        message: "New user added successfully",
        newUser
    })
}

function updateUser(req, res) {
    const { id } = req.params
    const { cpf, name, birthDate } = req.body

    const userExists = users.find((user) => user.id === Number(id))

    if (!userExists) {
        return res.send(400, { errorMessage: 'User not found' })

    }

    // Verifica se o cpf é um numero
    if (!isNumeric(cpf)) {
        return res.send(400, { errorMessage: 'Invalid CPF format' })
    }

    // Verifica se ja existe um cpf para esse usuario
    if (cpfExists(cpf)) {
        return res.send(400, { errorMessage: 'CPF already exists' })
    }

    // Verifica se a data esta em um formato valido
    if (!isValidDateFormat(birthDate)) {
        return res.send(400, { errorMessage: 'Invalid birthDate format' })
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