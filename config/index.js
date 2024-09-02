// Import
import { createPool } from "mysql2"
import "dotenv/config"

let connection = createPool({
    host:process.env.host,
    database:process.env.database,
    user:process.env.user,
    password:process.env.password,
    multipleStatements: true,
    connectionLimit: 30
})

connection.on('connection', (pool)=>{
    if(!pool) throw new Error('Unable to connect')
})

export{
    connection
}