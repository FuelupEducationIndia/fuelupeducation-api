const catchError = (err, res) => {
    let key = 'errors';
    let status = 400;
    res.send(err.name);
    switch (err.name) {
        case 'Error':
            err = err.mapped()
            break

        default:
            key = 'message'
            status = 500
            err = 'error in the server'
            break
    }

    res.status(status).json({
        [key]: err,
    });
}

module.exports.catchError = catchError;