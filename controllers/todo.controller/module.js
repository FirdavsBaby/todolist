const { fetch, fetchOne } = require("../../utils/pg")

const getAll = async(user_id)=> {
    const todos = await fetch("SELECT * FROM todos WHERE user_id = $1", user_id)
    return todos
}

const addtodo = async(user_id, title, description, important) => {
     await fetchOne("INSERT INTO todos(user_id, title, description, important) VALUES($1,$2,$3,$4)", user_id, title, description ? description : null, important ? important : false)
}

const findtodo = async(id, user_id) => {
    const todo = await fetchOne("SELECT * FROM todos WHERE id = $1 and user_id = $2", id, user_id)
    return todo
}
const UpdateTodo = async(id, title, description, important) => {
    await fetchOne("UPDATE todos SET title = $1, description = $2, important = $3 WHERE id = $4", title, description, important, id)
}
const DeleteTodo = async(id) => {
    await fetchOne("DELETE FROM todos WHERE id = $1", id)
}
module.exports = {
    getAll,
    addtodo,
    findtodo,
    UpdateTodo,
    DeleteTodo
}

