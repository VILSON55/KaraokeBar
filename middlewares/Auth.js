function isAuthenticated(req, res, next) {
  if (req.session.login) {
    return next();
  }

  return res
    .status(403)
    .send(
      "<h3>Para acessar essa página você precisa estar logado!</h3><script>setTimeout(()=> {window.location.assign('/loginpage')}, 3000)</script>"
    );
}

function isAdmin(req, res, next) {
  if (req.session.login.role == "ADMIN") {
    return next();
  }
  return res
    .status(403)
    .send("Você não tem autorização para acessar essa página!");
}

module.exports = {
  isAuthenticated,
  isAdmin,
};
