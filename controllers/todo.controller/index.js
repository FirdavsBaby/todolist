const Joi = require("joi")
const { getAll, addtodo, findtodo, UpdateTodo, DeleteTodo } = require("./module")

exports.getAllTodos = async(req,res) => {
    const { id } = req.user
    const todos = await getAll(id)
    res.status(200).json(todos)
}


exports.newTodo = async(req, res) => {
    const { id } = req.user
    const {title, description, important} = req.body
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string(),
        important: Joi.boolean()
    }) 
    const {error} = schema.validate({title, description, important})
    if (error) return res.status(400).json({error: error.message})  
    await addtodo(id, title, description, important) 
    res.status(201).json({message: "Todo added successfully"})
}

exports.updateTodo = async(req,res) => {
    const user_id  = req.user.id
    const {id} = req.params
    const {title, description, important} = req.body
    const schema = Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        important: Joi.boolean()
    }) 
    const {error} = schema.validate({title, description, important})
    if (error) return res.status(400).json({error: error.message})
    const findTodo = await findtodo(id, user_id)
    if (!findTodo) return res.status(401).json({error: "Todo not found"})
    await UpdateTodo(id, title ? title : findTodo.title, description ? description : findTodo.description, important ? important : findTodo.important)
    res.status(200).json({message: "Updated successfully"})
}

exports.deleteTodo = async(req,res)=> {
    const user_id  = req.user.id
    const {id} = req.params
    const findTodo = await findtodo(id, user_id)
    if (!findTodo) return res.status(401).json({error: "Todo not found"})
    await DeleteTodo(id)
    res.status(200).json({message: "Todo deleted successfully"})
}


