const express= require('express')
const app = express()
const db =require('./models')
const Todo = db.Todo

const port = 3000

/*根目錄*/
app.get('/',(req,res)=>{
  res.send('main page successful')
})
app.get('/todos',(req,res)=>{
  return Todo.findAll()
    .then((todos)=> res.send({ todos }))
    .catch((err) =>res.status(422).json(err))
})
/*新增*/
app.get('/todos/new',(req,res)=>{
  res.send('create todo')
})
app.post('/todos',(req,res)=>{
  res.send('add todo')
})
/*編輯*/
app.get('/todos/:id',(req,res)=>{
  res.send(`get todos: ${req.params.id}`)
})
app.get('/todos/:id/edit',(req,res)=>{
  req.send(`get todos edit: ${req.params.id}`)
})
app.put('/todos/:id',(req,res)=>{
  res.send('modify todo')
})
app.delete('/todos/:id',(req,res)=>{
  res.send('delete todo')
})

app.listen(port,()=>{
  console.log(`express server is running on http://localhost:${port}`)
})