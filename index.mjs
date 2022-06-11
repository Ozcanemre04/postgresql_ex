import express from "express";
import pkg from 'pg';
const { Pool } = pkg;
const app = express();
const PORT = 8200;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const pool = new Pool ({
     host: '127.0.0.1',
     user: 'my_new_project_admin',
     database: 'my_new_project',
     password: 'emre1030',
     port: 5432,
 });


app.get("/",(req,res)=>
     res.send({info:`Hello world!`})
)
// GET users
app.get('/users',async(req,res)=>{
     const users=await pool.query(`SELECT * FROM users`);
     res.send(users.rows)
     
})
//GET user
app.get('/users/:id',async(req,res)=>{
     try{
          const {id} = req.params;
          const users=await pool.query("SELECT * FROM USERS WHERE id=$1",[id])
          res.json(users.rows[0])

     }
     catch(err){
          console.log(err.message)
     }
     
})
//post user

app.post('/users',async(req,res)=>{
     try{
      const { firstName, lastName, email, ip } = req.body;
      const newUser=await pool.query('INSERT INTO users(firstname,lastname,email,ip) VALUES ($1,$2,$3,$4) RETURNING *',
      [firstName,lastName,email,ip])
      
      res.json(newUser.rows[0])
     }
     catch(err){
          console.error(err);
     }
})


//edit user

app.patch('/users/:id',async(req,res)=>{
     try{
       const {id} = req.params;
       const {firstName,lastName,email,ip} = req.body;
       const updateUser =await pool.query('UPDATE users SET firstname = $1,lastname=$2,email=$3,ip=$4 WHERE id=$5',[firstName,lastName,email,ip,id])
       res.json(updateUser.rows[0])
     }
     catch(err){
          console.error(err)
     }
})

//delete user
app.delete('/users/:id',async(req,res)=>{
     try{
          const {id} =req.params;
          const deleteUser=await pool.query('DELETE FROM users WHERE id = $1',[id]);
          res.json("user was succesfully deleted")

     }
     catch(err){
          console.error(err.message)
     }
})




app.listen(PORT,()=>console.log(`server started: http://localhost:${PORT}/`))