const validateParamRate = (req, res, next) => {
  const terms = Object.keys(req.query);
  if (terms.includes('rate')) {
    const rate = Number(req.query.rate);
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      return res
        .status(400)
        .json({
          message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
        });
    }
  }
  next();
};

module.exports = validateParamRate;
