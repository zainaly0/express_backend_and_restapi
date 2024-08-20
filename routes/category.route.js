/**
 * POST http://localhost:8888/ecomm/api/v1/categories
 */
categoryController = require('../controllers/category.controller')
auth_mw = require("../middlewares/auth.mw")


module.exports= (app) =>{
    app.post("/ecomm/api/v1/categories", [auth_mw.verifyToken, auth_mw.isAdmin], categoryController.createNewCategory)
}