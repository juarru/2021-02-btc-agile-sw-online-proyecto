const router = require('express').Router();
const controller = require('./controller');

/**
 * /api/task POST - create
 * /api/task GET - read all
 * /api/task/:id GET - read one
 * /api/task/:id PUT - update
 * /api/task/:id DELETE - delete
 */

router
    .route('/')
    .get(controller.all)
    .post(controller.create);

router
    .route('/:id')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;