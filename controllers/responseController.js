
module.exports = {

    successful: (res, msg = 'OK', data = {  }, status = 200) => {
        return res.status(status).json({ status: true, message: msg, data: data })
    },

    returnError: (res, error, data = { }, status = 200) => {
        error = (error.message) ? error.message : error
        return res.status(status).json({ status: false, message: error, data: data })
    }

}