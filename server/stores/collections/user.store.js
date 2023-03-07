const BaseModel = require('../base-model')
const path = require('path')

class UserStore extends BaseModel {

}

module.exports = new UserStore(path.basename(__filename).split('.')[0])