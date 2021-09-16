const express = require("express")
const userController = require('../controllers/userController')
const contactController = require('../controllers/contactController')
const contactRouter = express.Router()

// add friend router
contactRouter.post('/addFriend', userController.addFriend)

// delete friend router
<<<<<<< Updated upstream
contactRouter.post('/deleteFriend', contactController.deleteFriend)
=======
contactRouter.post('/:_id/deleteFriend', contactController.deleteFriend)

contactRouter.post('/:_id/acceptFriend', contactController.acceptFriend)

contactRouter.get('/', contactController.getContact)
>>>>>>> Stashed changes
module.exports = contactRouter