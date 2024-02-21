const express = require('express')
const router = express.Router()

const db = require('../models')
const Todo = db.Todo

/*todos目錄*/
router.get('/', (req, res) => {
	return Todo.findAll({
		attributes: ['id', 'name','isComplete'],
		raw: true
	})
		.then((todos) =>{
      res.render('todos', { todos:todos ,message: req.flash('success')  })})
		.catch((err) => {
      res.status(422).json(err)})
})

/*新增*/
router.get('/new',(req,res)=>{
  return res.render('new',{error: req.flash('error')})
})
router.post('/',(req,res)=>{
  try {
		const name = req.body.name
		return Todo.create({ name })
			.then(() => {
				req.flash('success', '新增成功!')
				return res.redirect('/todos')
			})
			.catch((error) => {
				console.error(error)
				req.flash('error', '新增失敗:(')
				return res.redirect('back')
			})
	} catch (error) {
		console.error(error)
		req.flash('error', '新增失敗:(')
		return res.redirect('back')
	}
})

/*單一詳細內容*/
router.get('/:id',(req,res)=>{
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
router.get('/:id/edit',(req,res)=>{
  const id = req.params.id
  return Todo.findByPk(id,{
    attributes:['id','name','isComplete'],
    raw : true
  })
    .then((todo)=>{
      res.render('edit',{todo, error:req.flash('error')})
    })
})
router.put('/:id',(req,res)=>{
  try{
    const {name, isComplete} = req.body
      const id = req.params.id

      return Todo.update({name:name, isComplete:isComplete==='completed'},{where:{id}})
        .then( ()=> {
          req.flash('success', '編輯成功!')
          res.redirect(`/todos/${id}`)
        })
        .catch((error)=>{
          console.error(error)
          req.flash('error', '編輯失敗:(')
          return res.redirect(`back`)
        })
  } catch (error) {
		console.error(error)
		req.flash('error', '新增失敗:(')
		return res.redirect('back')
	}
})
/*刪除*/
router.delete('/:id',(req,res)=>{
  const id= req.params.id 
  return Todo.destroy({where: {id} })
    .then(()=>{
      req.flash('success', '刪除成功!')
      res.redirect('/todos')
    })
})

module.exports = router