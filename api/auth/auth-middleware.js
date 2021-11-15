const Users = require('../users/users-model')


const checkUserNameAvailable = async (req, res , next) => {
    try{
        const { username } = req.body
        const [user] = await Users.findBy({ username })
        if(user) {
            next({ status: 403, message: 'Username is unavailable'})
        }else{
            next()
        }
    }catch(err){
        next(err)
    }
}

const validateUser = async (req, res, next ) => {
    try {
        const { username, password, first_name, last_name } = req.body
        if (!username || !password || !first_name || !last_name){
            next({ status: 400, message: 'username, password, and name are required'})
        }else{
            next()
        }
    }catch(err){
        next(err)
    }
}

module.exports = {
    checkUserNameAvailable,
    validateUser
}