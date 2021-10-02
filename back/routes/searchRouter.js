const express = require("express")
const userController = require('../controllers/userController')
const searchRouter = express.Router()

// Search the user by userid
searchRouter.post('/:_id/search', userController.SearchUserID)

// Send a request
searchRouter.post('/:_id/addFriend', userController.addFriend)

module.exports = searchRouter
