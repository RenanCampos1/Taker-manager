const validateToken = (req, res, next) => {
  const headers = Object.keys(req.headers);
  const authorizationHeader = headers.find((header) => header.toLowerCase() === 'authorization');
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  const authorization = req.headers[authorizationHeader];
  if (typeof authorization !== 'string' || authorization.length !== 16) {
    console.log(authorization);
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = validateToken;