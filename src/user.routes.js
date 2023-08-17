import { Router } from "express"
import { UserRepository } from "./repository/UserRepository.js"

const userRout = Router()

const userRepository = new UserRepository()

userRout.post('/users', (req, res) => {
    const { cpf, name, birthDate } = req.body

    userRepository.create({ cpf, name, birthDate })
    return res.status(200).send()
})

export { userRout }