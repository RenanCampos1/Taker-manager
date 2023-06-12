const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) {
    return res.status(400).json({ 
      message: 'O campo "watchedAt" é obrigatório' });
  }

  const regexDate = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  if (!regexDate.test(watchedAt)) {
    return res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate === undefined) {
    return res.status(400).json({ 
      message: 'O campo "rate" é obrigatório' });
  }

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório' });
  }

  next();
};

module.exports = {
  validateTalk,
  validateWatchedAt,
  validateRate,
};