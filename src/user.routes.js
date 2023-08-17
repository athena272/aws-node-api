import { Router } from "express"

const userRout = Router()

userRout.get('/', (req, res) => {
    res.json({ message: "Welcome to the app!" })
})

export { userRout }