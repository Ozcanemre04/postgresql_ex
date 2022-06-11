
import pkg from 'pg';
const { Pool } = pkg;
import {users} from './user.mjs'




const pool = new Pool({
    host: '127.0.0.1',
    user: 'my_new_project_admin',
    database: 'my_new_project',
    password: 'emre1030',
    port: 5432,
});


const text = `
    CREATE TABLE IF NOT EXISTS users (
        "id" SERIAL PRIMARY KEY,
        "firstname" VARCHAR,
        "lastname" VARCHAR,
        "email"  VARCHAR,
        "ip" VARCHAR
        
    );`;

const execute = async (query) => {
    try {
        await pool.connect();     // gets connection
        await pool.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await addRow()
        
    }
};




    execute(text).then(result => {
        if (result) {
            console.log('Table created succesfully');
        }
    });



    async function addRow() {
      for(let i=0;i<users.length;i++){
          try{
               await pool.query('INSERT INTO users (id,firstname,lastname,email,ip) VALUES ($1,$2,$3,$4,$5) RETURNING *',
               [users[i].id,users[i].firstName,users[i].lastName,users[i].email,users[i].ip]
               )
          }
          catch(err){
              console.log(err);
          }
          
      }
      }

   