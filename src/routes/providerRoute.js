const express = require('express'),
        validator = require('../middleware/validatorMiddleware'),
        providerRouter = express.Router(),
        providerController = require('../controllers/providerController');

/**
 * Аll routes start with '/provider'
 **/

// add a provider
providerRouter.post('/', validator('provider-create'), providerController.create);

// get all providers
providerRouter.get('/', providerController.getAll);

// update a provider
providerRouter.put('/:id', validator('provider-update'), providerController.update);

// delete a provider
providerRouter.delete('/:id', providerController.delete);

module.exports = providerRouter;
