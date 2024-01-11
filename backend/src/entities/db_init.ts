import mysql from 'mysql2/promise.js'
import env from 'dotenv';

env.config();

function createDatabase(){   
    mysql.createConnection({
    user : 'admin',
    password : '123123'
    })
    .then((connection) => {   
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${'user_db'}`)
    })    
    .catch((err) => {
    console.warn(err.stack)
    })
}

function fkConfig()
{
    // this would be used if we would not have set up the relationships in the entity models  
}

function db_init(){
    createDatabase();
    //fkConfig();    
}

export default db_init;