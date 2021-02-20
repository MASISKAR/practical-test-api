const express = require('express'),
  validator = require('../middleware/validatorMiddleware'),
  clientRouter = express.Router(),
  clientController = require('../controllers/clientController');
  
/**
 * Аll routes start with '/client'
 **/

// add a client
clientRouter.post('/', validator('client-create'), clientController.create);

// get a client
clientRouter.get('/:id', clientController.getSingle);

// get all clients
clientRouter.get('/', clientController.getAll);

// update a client
clientRouter.put('/:id', validator('client-update'), clientController.update);

// delete a client
clientRouter.delete('/:id', clientController.delete);

module.exports = clientRouter;
