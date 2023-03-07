const BaseModel = require('../base-model')
const path = require('path')

class WithdrawStore extends BaseModel {

}

module.exports = new WithdrawStore(path.basename(__filename).split('.')[0])