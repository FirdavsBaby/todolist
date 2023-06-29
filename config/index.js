require("dotenv/config")

const {env} = process


module.exports = {
    PORT: env.PORT,
    SECRET_KEY: env.SECRET_KEY,
    CONNECTION : env.CONNECTION_STRING
}