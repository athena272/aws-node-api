import express from 'express'
import { userRout } from './user.routes.js'

const app = express()

app.use(express.json())

app.use('/users', userRout)

app.listen(3000, () => console.log('🔥 server on fire 🔥'))
0