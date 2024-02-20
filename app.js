const express= require('express')
const app = express()
const port = 3000
const db =require('./models')
const Todo = db.Todo


const{engine}=require('express-handlebars')  
app.engine('hbs',engine({extname:'.hbs'}))
app.set('view engine','.hbs')
app.set('views','./views')

app.use(express.urlencoded({ extended:true }))

const methodOverride =require('method-override')
app.use(methodOverride('_method'))

const flash = require('connect-flash')
const session = require('express-session')
app.use(session({
    secret:'ThisIsMySecret',
    resave:'false',
    saveUninitialized: false
}))
app.use(flash())

/*根目錄*/
app.get('/',(req,res)=>{
  res.render('index')
})
app.get('/todos', (req, res) => {
	return Todo.findAll({
		attributes: ['id', 'name','isComplete'],
		raw: true
	})
		.then((todos) =>{res.render('todos', { todos:todos ,message: req.flash('success')  })})
		.catch((err) => res.status(422).json(err))
})

/*新增*/
app.get('/todos/new',(req,res)=>{
  return res.render('new')
})
app.post('/todos',(req,res)=>{
  const name =req.body.name
  return Todo.create({name:name})
    .then(()=> {
      req.flash('success', '新增成功!')
      res.redirect('/todos')
    })
    .catch((err) => console.log(err))
})

/*單一詳細內容*/
app.get('/todos/:id',(req,res)=>{
  const id = req.params.id
  return Todo.findByPk(id,{
    attributes:['id','name','isComplete'],
    raw: true
  })
    .then((todo)=>{
      res.render('todo',{todo:todo ,message: req.flash('success')})})
    .catch((err)=>console.log(err))
})
/*編輯*/
app.get('/todos/:id/edit',(req,res)=>{
  const id = req.params.id
  return Todo.findByPk(id,{
    attributes:['id','name','isComplete'],
    raw : true
  })
    .then((todo)=>{
      res.render('edit',{todo})
    })
})
app.put('/todos/:id',(req,res)=>{
  const {name, isComplete} = req.body
  const id = req.params.id

  return Todo.update({name:name, isComplete:isComplete==='completed'},{where:{id}})
    .then( ()=> {
      req.flash('success', '編輯成功!')
      res.redirect(`/todos/${id}`)
    })
})
/*刪除*/
app.delete('/todos/:id',(req,res)=>{
  const id= req.params.id 
  return Todo.destroy({where: {id} })
    .then(()=>{
      req.flash('success', '刪除成功!')
      res.redirect('/todos')
    })
})

app.listen(port,()=>{
  console.log(`express server is running on http://localhost:${port}`)
})