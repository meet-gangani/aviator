const BaseModel = require('../base-model')
const path = require('path')

class DepositStore extends BaseModel {

}

module.exports = new DepositStore(path.basename(__filename).split('.')[0])