exports.successMessage = (req, res, status, message) => {
    const successData = {
        "status": status,
        "success": true,
        "successMessage": message,
        "data": req
    }
    res.send(successData);
}

exports.errorMessage = async(err, res, status) => {
    const errorData = {
        "status": status,
        "success": false,
        "errorMessage": err.message
    }
    res.json(errorData);
}