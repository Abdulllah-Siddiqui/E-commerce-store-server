import { connection, connect, set } from 'mongoose';

const { MONGO_URL } = process.env;
console.log('\n\n', 'MONGO_URL', MONGO_URL);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

(function SetupDatabase() {
  const { readyState } = connection;

  if (
    readyState !== 1 || readyState !== 2
  ) {
    set('strictQuery', false)
    connect(MONGO_URL, options)
      .then(() => {
        console.log('INFO - MongoDB Database connected.', { MONGO_URL });
      })
      .catch(err => console.log('ERROR - Unable to connect to the database:', err));
  }
}());
