const { fetchOne } = require("../utils/pg")

module.exports = async(req,res,next)=> {
    const {verify} = req
    const user = await fetchOne("select * from users where id = $1", verify.id)
    req.user = user
    next()
}
