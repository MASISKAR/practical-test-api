const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const ProviderSchema = new Schema(
        {
          name: {
            type: String,
            unique: true,
            required: true
          }
        }
);

module.exports = mongoose.model('Provider', ProviderSchema);
