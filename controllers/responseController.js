
module.exports = {

    successful: (res, msg = 'OK', data = {  }, estatus = 200) => {
        return res.status(estatus).json({ status: true, message: msg, data: data })
    },

    returnError: (res, error, data = { }, estatus = 200) => {
        error = (error.message) ? error.message : error
        return res.status(estatus).json({ status: false, message: error, data: data })
    }

}