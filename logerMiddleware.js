const logger = (req, res, next) => {
    console.log('Middleware')
    console.log(req.method)
    console.log(req.path)
    console.log(req.body)
    next()
}

module.exports = logger