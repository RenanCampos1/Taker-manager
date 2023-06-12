const express = require('express');
const connections = require('../utils/DataBase/connections');
const {
  readAll,
  readById,
  writingTalker,
  updatedTalker,
  removeTalker,
  filterTalker,
  updateRate,
} = require('../utils/readAndWriteFiles');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/ValidateAge');
const { validateTalk } = require('../middlewares/validateTalk');
const { validateWatchedAt } = require('../middlewares/validateTalk');
const { validateRate } = require('../middlewares/validateTalk');
const validateTerms = require('../middlewares/ValidateTerm');
const validateParamDate = require('../middlewares/ValidateParamDate');
const validateParamRate = require('../middlewares/ValidateParamRate');
const { validateOnlyRate } = require('../middlewares/ValidateRate');
const { validateIfIsZero } = require('../middlewares/ValidateRate');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await readAll();
  return res.status(200).json(talkers || []);
});

router.get('/db', async (req, res) => {
  const [response] = await connections.execute('SELECT * FROM talkers');

  const talkers = response.map((t) => ({
    id: t.id,
    name: t.name,
    age: t.age,
    talk: {
      watchedAt: t.talk_watched_at,
      rate: t.talk_rate,
    },
  }));

  res.status(200).json(talkers);
});

router.get(
  '/search',
  validateToken,
  validateTerms,
  validateParamRate,
  validateParamDate,
  async (req, res) => {
    const { query } = req;
    const talkers = await filterTalker(query);
    return res.status(200).json(talkers);
  },
);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readById(id);
  if (talker.length === 0) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker[0]);
});

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const talker = req.body;
    const id = await writingTalker(talker);
    return res.status(201).json({ id, ...talker });
  },
);

router.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const talker = req.body;
    const updatedTalkerId = await updatedTalker(id, talker);
    if (!updatedTalkerId) {
      return res
        .status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json({ id: +id, ...talker });
  },
);

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await removeTalker(id);
  return res.sendStatus(204);
});

router.patch(
  '/rate/:id',
  validateToken,
  validateIfIsZero,
  validateOnlyRate,
  async (req, res) => {
    const { id } = req.params;
    updateRate(id, req.body);
    return res.sendStatus(204);
  },
);

module.exports = router;
