const mongoose = require('mongoose'),
beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.plugin(beautifyUnique, {
  defaultMessage: "{PATH} ({VALUE}) duplication detected"
});

module.exports = mongoConfig => {
  return mongoose.connect(
          mongoConfig.connection.url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};
