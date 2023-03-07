exports.yourCommonFunction = (par1, par2) => {
  // Logic
  return { par1, par2 }
}

exports.sendSuccess = (res) => (data) => {
  // data.type = "success"
  res.status(200).header('Content-Type', 'application/json', 'access-control-allow-origin', '*').send(data)
}

exports.sendError = (res, status = 500, message) => (error) => {
  this.logError(message, error, res.request.id)
  let response = {
    type: 'error',
    message: message || error.message
  }

  if (error) {
    response = {
      ...response,
      ...(error.data || {})
    }
  }

  res.status(status).header('Content-Type', 'application/json', 'access-control-allow-origin', '*').send(response)
}

exports.throwError = (code, errorType, errorMessage) => (error) => {
  this.logError(errorMessage, error)
  if (!error) error = new Error(errorMessage || 'Default Error')
  error.code = code
  error.errorType = errorType
  error.message = errorMessage || error.message
  throw error
}

exports.logMessage = (...args) => {
  let log = ''

  for (const arg of args) {
    if ((typeof arg) === 'object') {
      log += JSON.stringify(arg)
    } else {
      log += arg || ''
    }

    log += ' '
  }

  console.log(log)
}

exports.logError = (message, exception = null, reqId = null) => {
  const msgObj = {
    reqId,
    message: message || ''
  }

  const obj = {
    msg: `ERROR ${JSON.stringify(msgObj)}`
  }

  if (exception) {
    try {
      // This code is updated to capture google ads error and print it in readable format
      obj.err = exception.errors ? JSON.stringify(exception.errors) : exception
    } catch (e) {
      obj.err = exception
    }
  }

  console.log(obj)
}