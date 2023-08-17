import { User } from "../model/User.js"

class UserRepository {
    constructor() {
        this.users = []
    }

    //create a new user
    create({ cpf, name, birthDate }) {
        const user = new User()

        Object.assign(user, {
            cpf: cpf,
            name: name,
            birthDate: birthDate,
        })

        this.users.push(user)
    }
}

export { UserRepository }