const expres = require('express')

const router = new expres.Router()
const userController = require('../Controllers/userController')
const blogController = require('../Controllers/blogController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const multterMiddleware = require('../Middleware/multterMiddleware')


//paths

router.post('/user/register',userController.register)

router.post('/user/login',userController.userLogin)


// blogs

router.post('/userblog/addblogs',jwtMiddleware,multterMiddleware.single('blogImage'),blogController.addBlog)


router.get('/userblog/getthreeblogs',blogController.getThreeBlog)
router.get('/userblog/getallblogs',blogController.getAllblogs)
router.get('/userblog/getuserblog',jwtMiddleware,blogController.getUserBlogs)

router.get('/userblog/getselected/:id',blogController.getSelectegBlog)

router.get('/userblog/editblog/:id',blogController.editUserBlogs)

router.delete('/userblog/delete/:id',jwtMiddleware,blogController.delteBlog)




module.exports = router