const express = require("express")
const userController = require('../controllers/userController')
const searchRouter = express.Router()


searchRouter.post('/:_id/search', userController.SearchUserID)
searchRouter.post('/:_id/addFriend', userController.addFriend)

module.exports = searchRouter
