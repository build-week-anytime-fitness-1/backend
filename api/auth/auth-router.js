const router = require('express').Router();
const Users = require('../users/users-model')
const { BCRYPT_ROUNDS } = require('../secrets/index')
const bcrypt = require('bcryptjs')
const {checkUserNameAvailable, validateUser } = require('./auth-middleware')



router.post('/register', validateUser, checkUserNameAvailable, async (req, res, next) => {
    try{
        const user = req.body
        const hash = bcrypt.hashSync(user.password, Number(BCRYPT_ROUNDS))
        user.password = hash
        const newUser = await Users.add(req.body)
        res.status(201).json(newUser)
    }catch(err){
        next(err)
    }
})


module.exports = router;
