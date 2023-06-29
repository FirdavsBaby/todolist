const {Router}= require("express")
const { getAllTodos, newTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller")
const isAuth = require("../middlewares/isAuth")
const currentUser = require("../middlewares/currentUser")

const router = new Router()

router.get("/todos", isAuth, currentUser ,getAllTodos)
router.post("/todos/new", isAuth, currentUser, newTodo)
router.put("/todos/update/:id", isAuth, currentUser, updateTodo)
router.delete("/todos/delete/:id", isAuth, currentUser, deleteTodo)
module.exports = router