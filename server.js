const envPath = './config/env/.env';
require('dotenv').config({path: envPath});

const app = require('./src/bootstrap/app');

let port = +process.env.PORT;
if (!port) {
  port = 3001;
}

app.set('port', port);
const server = require('http').createServer(app);

const mongoConfig = {
  connection: {
    url: process.env.MONGO_API
  },
};
app.dbConnect(mongoConfig)
  .then(() => {
    console.log('-------------------- API is running --------------------');
    console.log('Database connection has been established successfully.');
    server.listen(port, '0.0.0.0');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  console.log('-------------------- App unexpectedly stopped --------------------');
    throw error;
}


function onListening() {
  app.isRunning.resolve();
}

module.exports = app;
