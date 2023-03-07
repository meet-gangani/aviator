sendSuccess = (res, data = {}) => {
  res.status(200).send(data)
}

sendError = (res, message, error, stausCode) => {
  console.log('Error => ', { message, error })
  res.status(stausCode || 500).send({
    error: error?.message || message || 'something went wrong.'
  })
}

module.exports = {
  sendSuccess,
  sendError
}