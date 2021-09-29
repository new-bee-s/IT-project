const express = require("express")
const infoController = require('../controllers/infoController')
const userController = require('../controllers/userController')
const upload = require('../middleware/upload')
const infoRouter = express.Router()
const passport = require('passport')
require('../config/passport')(passport)

infoRouter.post('/:_id/editInfo', infoController.editInfo)

infoRouter.get('/:_id', userController.getUserInfo)

infoRouter.post('/:_id/uploadImage', upload.single('image'), (req, res) => infoController.uploadImage(req, res))

module.exports = infoRouter
