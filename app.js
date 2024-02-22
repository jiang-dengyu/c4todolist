const express= require('express')
const app = express()
const port = 3000

const router = require('./routes')
const messsageHandler = require('./middlewares/message-handler')

const{engine}=require('express-handlebars')  
app.engine('hbs',engine({extname:'.hbs'}))
app.set('view engine','.hbs')
app.set('views','./views')

app.use(express.urlencoded({ extended:true }))

const methodOverride =require('method-override')
app.use(methodOverride('_method'))

const flash = require('connect-flash')
const session = require('express-session')
const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')

app.use(session({
    secret:'ThisIsMySecret',
    resave:false,
    saveUninitialized: false
}))
app.use(flash())
app.use(messageHandler)
app.use(router)
app.use(errorHandler)

app.listen(port,()=>{
  console.log(`express server is running on http://localhost:${port}`)
})