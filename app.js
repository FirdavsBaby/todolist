const express = require('express')
const cors = require('cors')
const router = require('./routes')
const app = express()
const { PORT } = require("./config")
require("express-async-errors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api", router)
app.use((err, req, res, next) => {
    res.status(500).json({error: err.message})
})

app.listen(PORT,()=> {
    console.log(PORT);
})
