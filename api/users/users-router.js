const router = require('express').Router()
const Users = require('./users-model')

router.get('/roles', async (req, res, next) => {
    try{
         const roles = await Users.getRoles()
         res.status(200).json(roles)
    }catch(err){
        next(err)
    }
})

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

module.exports = router