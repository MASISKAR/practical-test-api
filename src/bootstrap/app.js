Promise = require('bluebird');
const express = require('express'),
  helmet = require('helmet'),
  cors = require('cors'),
  bodyParser = require('body-parser');

const app = express();

app.isRunning = Promise.pending();
app.dbConnect = require('./mongo');

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true
}));

app.use(cors());

app.set('showStackError', true);
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_HOST || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

app.enable('case sensitive routing');
app.enable('strict routing');

const swaggerUi = require('swagger-ui-express'),
        swaggerDocument = require('../../swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/client', require('../routes/clientRoute'));
app.use('/provider', require('../routes/providerRoute'));

require('./errorHandler')(app);

module.exports = app;
