const { fetchOne }  = require("../../utils/pg")


const findUser = async(username) => {
    const user = await fetchOne("SELECT * FROM users WHERE username = $1", username)
    return user
}

const newUser = async(username, password) => {
    const user = await fetchOne("INSERT INTO users(username, password) VALUES($1, $2) returning *", username, password)
    return user
}

module.exports = {
    findUser,
    newUser
}