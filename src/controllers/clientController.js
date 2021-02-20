const customErrors = require('../../config/customErrors'),
        ObjectId = require('mongoose').Types.ObjectId,
        clientSchema = require('../schemas/clientSchema');

class ClientController {
  
  create = async (req, res, next) => {
    try {
      
      //create new client and populate with providers
      const client = await clientSchema
      .findOneAndUpdate({_id: ObjectId()}, req.body, {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        populate: 'providers'
      })
      .lean();
      
      res.json(client);
    } catch (err) {
      next(err);
    }
  };
  
  getSingle = async (req, res, next) => {
    try {
      const client = await clientSchema
      .findById(req.params.id)
      .populate('providers')
      .lean();
      
      if (!client) throw customErrors.clientNotFound;
      res.json(client);
    } catch (err) {
      next(err);
    }
  };
  
  getAll = async (req, res, next) => {
    try {
      const clients = await clientSchema
      .find()
      .populate('providers')
      .lean();
      
      if (!clients) throw customErrors.clientNotFound;
      
      res.json(clients);
    } catch (err) {
      next(err);
    }
  };
  
  update = async (req, res, next) => {
    try {
      const client = await clientSchema
      .findByIdAndUpdate(
              req.params.id,
              req.body,
              {new: true}
      )
      .populate('providers')
      .lean();

      if (!client) throw customErrors.clientNotFound;
      
      res.json(client);
    } catch (err) {
      next(err);
    }
  };
  
  
  delete = async (req, res, next) => {
    try {
      const client = await clientSchema.findByIdAndDelete(req.params.id);
      if (!client) throw customErrors.clientNotFound;
      
      res.json({success: true});
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new ClientController();
