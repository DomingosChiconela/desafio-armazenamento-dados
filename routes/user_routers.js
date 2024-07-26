const  router =  require('express').Router()

const{getAllUser,getUser} = require('../controllers/user_controllers')



router.get("/",getAllUser)
router.get("/:id",getUser)







module.exports = router