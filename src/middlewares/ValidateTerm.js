const { readAll } = require('../utils/readAndWriteFiles');

const validateTerm = async (req, res, next) => {
  const terms = Object.keys(req.query);
  if (terms.length === 1 && terms[0] === 'q') {
    const term = req.query.q;
  const talker = await readAll();
  if (!term || term.length === 0) {
    return res.status(200).json(talker);
  }
  return next();
  }
  next();
};

module.exports = validateTerm;