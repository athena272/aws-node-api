import { Router } from "express"
import { UserRepository } from "./repository/UserRepository.js"

const userRouter = Router() 

const userRepository = new UserRepository()

userRouter.post('/users', (req, res) => { 
    const { cpf, name, birthDate } = req.body

    userRepository.create({ cpf, name, birthDate })
    return res.status(200).send()
})

export { userRouter } 
