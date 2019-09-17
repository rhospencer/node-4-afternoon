require('dotenv').config()
const express = require('express')
const session = require('express-session')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')
const checkForSession = require('./middlewares/checkForSession')
const {SERVER_PORT, SESSION_SECRET} = process.env

const app = express()

app.use(express.static(__dirname + '/../build'))
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)

// ENDPOINTS
app.get('/api/swag', swagCtrl.read)

app.get('/api/user', authCtrl.getUser)
app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signOut)

app.post('/api/cart/checkout', cartCtrl.checkout)
app.post(`/api/cart/:id`, cartCtrl.add)
app.delete(`/api/cart/:id`, cartCtrl.delete)

app.get('/api/search', searchCtrl.search)


app.listen(SERVER_PORT,() => console.log(`Listening on port ${SERVER_PORT}`))