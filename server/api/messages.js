const router = require('express').Router();
const { Message, Author } = require('../db/models');

module.exports = router;

// GET api/messages
router.get('/', function (req, res, next) {
  Message.findAll()
    .then(messages => res.json(messages))
    .catch(next);
});

// POST /api/messages
router.post('/', function (req, res, next) {

  // We don't have proper users yet (we'll get there soon, though!).
  // Instead, we'll findOrCreate an author by name, for simplicity.
  // Of course, you wouldn't want to do this in a real chat app!
  Author.findOrCreate({
    where: {
      name: req.body.name || 'Cody'
    }
  })
  .spread(author => {
    const message = Message.build(req.body);
    message.setAuthor(author, { save: false });
    return message.save()
      .then(message => {
        message = message.toJSON();
        message.author = author;
        return message;
      });
  })
  .then(message => {
    res.json(message);
  })
  .catch(next);

});

// PUT /api/messages
router.put('/:messageId', function (req, res, next) {
  const messageId = req.params.messageId;

  Message.findById(messageId)
    .then(message => message.update(req.body))
    .catch(next);
});

// DELETE /api/messages
router.delete('/:messageId', function (req, res, next) {
  const id = req.params.messageId;

  Message.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});
