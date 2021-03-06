const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./data/db-config')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())


const authRouter = require('./auth/auth-router')
const classRouter = require('./classes/classes-router')
const userRouter = require('./users/users-router')


function getAllUsers() { return db('users') }

server.get('/api/users', async (req, res) => {
  res.json(await getAllUsers())
})

//async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//  const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
 // return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
//}

server.get('/', (req, res) => {
  res.json({ message: 'Api is working add a route to see more' });
});



server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)
server.use('/api/classes', classRouter)



// eslint-disable-next-line
server.use(( err, req, res, next) => {
  res.status( err.status || 500).json({
    message: err.message || 'Internal server error',
    stack: err.stack
  })
})

module.exports = server
