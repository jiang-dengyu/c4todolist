const express = require('express')
const router = express.Router()

const db = require('../models')
const Todo = db.Todo
		
/*todos目錄*/
router.get('/', (req, res, next) => {
	const page = parseInt(req.query.page) || 1;
	const limit=10;

	return Todo.findAll({
			attributes: ['id', 'name', 'isComplete'],
			raw: true
		})
			.then((todos) => res.render('todos', { 
					todos : todos.slice((page - 1) * limit, page * limit),
					prev: page > 1 ? page - 1 : page,
					next: page + 1,
					page : page
			}))
			.catch((error) => {
					error.errorMessage= '資料取得失敗:('
					next(error)
			})

})

/*新增*/
router.get('/new', (req, res) => {
		return res.render('new')
})
router.post('/',(req,res,next)=>{
		const name = req.body.name
		return Todo.create({ name })
			.then(() => {
				req.flash('success', '新增成功!')
				return res.redirect('/todos')
			})
			.catch((error) => {
				error.errorMessage = '新增失敗:('
				next(error)
			})
})

/*單一詳細內容*/
router.get('/:id', (req, res, next) => {
		const id = req.params.id

		return Todo.findByPk(id, {
			attributes: ['id', 'name', 'isComplete'],
			raw: true
		})
			.then((todo) => res.render('todo', { todo:todo }))
			.catch((error) => {
				error.errorMessage= '資料取得失敗:('
				next(error)
			})
})
/*編輯*/
router.get('/:id/edit', (req, res,next) => {
		const id = req.params.id

		return Todo.findByPk(id, {
			attributes: ['id', 'name', 'isComplete'],
			raw: true
		})
			.then((todo) => res.render('edit', { todo, error: req.flash('error') }))
			.catch((error) => {
				error.errorMessage= '資料取得失敗:('
				next(error)
			})
})
router.put('/:id',(req,res,next)=>{
    const {name, isComplete} = req.body
      const id = req.params.id

      return Todo.update({name:name, isComplete:isComplete==='completed'},{where:{id}})
        .then( ()=> {
          req.flash('success', '更新成功!')
          res.redirect(`/todos/${id}`)
        })
        .catch((error)=>{
          error.errorMessage= '更新失敗:('
					next(error)
			})
})
/*刪除*/
router.delete('/:id', (req, res,next) => {
		const id = req.params.id

		return Todo.destroy({ where: { id }})
			.then(() => {
				req.flash('success', '刪除成功!')
				return res.redirect('/todos')
			})
			.catch((error) => {
				error.errorMessage= '刪除失敗:('
				next(error)
			})
})

module.exports = router