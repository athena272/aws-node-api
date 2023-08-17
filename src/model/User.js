import { v4 as uuidv4 } from 'uuid'

class User {
    id
    cpf
    name
    birthDate

    constructor({ }) {
        if (!this.id) {
            this.id = uuidv4()
        }

        this.birthDate = new Date(this.birthDate)
    }
}

export { User }