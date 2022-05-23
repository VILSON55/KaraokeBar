
function isAuthenticated(req, res, next) {
    if (req.session.login) {
        return next()
    }

    return res.status(403).send("Para acessar essa página você precisa estar logado!"); 
}

function isAdmin(req, res, next) {
    if (req.session.login.role == 'ADMIN') {
        return next()
    }

    return res.status(403).send("Você não tem autorização para acessar essa página!"); 
}

module.exports = {
    isAuthenticated,
    isAdmin
}