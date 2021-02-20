const customErrors = require('../../config/customErrors'),
        providerSchema = require('../schemas/providerSchema');

class ProviderController {
  create = async (req, res, next) => {
    try {
      const provider = await providerSchema.create(req.body);
      res.json(provider);
    } catch (err) {
      next(err);
    }
  }
  
  getAll = async (req, res, next) => {
    try {
      const providers = await providerSchema
      .find()
      .lean();
      if (!providers) throw customErrors.providerNotFound;
      
      res.json(providers);
    } catch (err) {
      next(err);
    }
  }
  
  update = async (req, res, next) => {
    try {
      const provider = await providerSchema
      .findByIdAndUpdate(
              req.params.id,
              req.body,
              {new: true}
      )
      .lean();
      if (!provider) throw customErrors.providerNotFound;

      res.json(provider);
    } catch (err) {
      next(err);
    }
  }
  
  delete = async (req, res, next) => {
    try {
      const provider = await providerSchema.findByIdAndDelete(req.params.id);
      if (!provider) throw customErrors.providerNotFound;
      res.json({success: true});
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProviderController();
