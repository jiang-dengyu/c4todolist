const express= require('express')
const app = express()
const db =require('./models')
const Todo = db.Todo

const port = 3000

const{engine}=require('express-handlebars')  
app.engine('hbs',engine({extname:'.hbs'}))
app.set('view engine','.hbs')
app.set('views','./views')

app.use(express.urlencoded({ extended:true }))

const methodOverride =require('method-override')
app.use(methodOverride('_method'))

/*根目錄*/
app.get('/',(req,res)=>{
  res.render('index')
})
app.get('/todos', (req, res) => {
	return Todo.findAll({
		attributes: ['id', 'name'],
		raw: true
	})
		.then((todos) => res.render('todos', { todos }))
		.catch((err) => res.status(422).json(err))
})

/*新增*/
app.get('/todos/new',(req,res)=>{
  return res.render('new')
})
app.post('/todos',(req,res)=>{
  const name =req.body.name
  return Todo.create({name:name})
    .then(()=> res.redirect('/todos'))
    .catch((err) => console.log(err))
})

/*單一詳細內容*/
app.get('/todos/:id',(req,res)=>{
  const id = req.params.id
  return Todo.findByPk(id,{
    attributes:['id','name'],
    raw: true
  })
    .then((todo)=>res.render('todo',{todo}))
    .catch((err)=>console.log(err))
})
/*編輯*/
app.get('/todos/:id/edit',(req,res)=>{
  const id = req.params.id
  return Todo.findByPk(id,{
    attributes:['id','name'],
    raw : true
  })
    .then((todo)=>{res.render('edit',{todo})})
})
app.put('/todos/:id',(req,res)=>{
  const body = req.body
  const id = req.params.id

  return Todo.update({name:body.name},{where:{id}})
    .then( ()=> res.redirect(`/todos/${id}`))
})
app.delete('/todos/:id',(req,res)=>{
  res.send('delete todo')
})

app.listen(port,()=>{
  console.log(`express server is running on http://localhost:${port}`)
})