

const create  =(req, res, next) => {
    res.send(req.body)
}

module.exports = {
    create
}
