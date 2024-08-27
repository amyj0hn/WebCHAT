// Import
import { createPool } from "mysql2"
import "dotenv/config"

let  pool = createPool({
    host:process.env.host,
    database:process.env.database,
    user:process.env.user,
    password:process.env.password,
    multipleStatements: true,
    connectionLimit: 30
})

pool.on('pool', (pool)=>{
    if(!pool) throw new Error('Unable to connect')
    // console.log('pool created')
})

export{
    pool
}