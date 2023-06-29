const {Pool} = require("pg")
const { CONNECTION } = require("../config")

const pool = new Pool({
    connectionString: CONNECTION
})

const fetch = async(SQL, ...values) => {
    const client =  await pool.connect()
    try {
        const {rows} = await client.query(SQL, values ? values : null)
        return rows
    } catch (error) {
        console.log(error);
    }finally{
     client.release()
    }
}



const fetchOne = async(SQL, ...values) => {
    const client =  await pool.connect()
    try {
        const {rows: [row]} = await client.query(SQL, values ? values : null)
        return row
    } catch (error) {
        console.log(error);
    }finally{
     client.release()
    }
}


module.exports = {
    fetch, fetchOne
}