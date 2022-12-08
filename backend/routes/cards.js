const router = require('express').Router();
const {
  getCards,
  createCards,
  deleteCard,
  putLikes,
  deleteLikes,
} = require('../controllers/cards');
const {
  paramsCards,
  bodyCards,
} = require('../validators/card');

router.get('/', getCards);
router.delete('/:cardId', paramsCards, deleteCard);
router.post('/', bodyCards, createCards);
router.put('/:cardId/likes', paramsCards, putLikes);
router.delete('/:cardId/likes', paramsCards, deleteLikes);

module.exports = router;
