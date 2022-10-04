const path = require('path');
const express = require('express');
const app = express();

// Object that contains our create user & verify user routes
const apiRouter = require('./routes/api.js');

// Automatically parses incoming json requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve from bundled distribution folder when in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

// General endpoint - routes user to our html page (from which React Router routes them to the login page)
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });

// Sends api endpoints to be managed by the already imported API router object 
app.use('/api', apiRouter);

// Manages unknown endpoints
app.use((req, res) => res.status(404).send('Oops, page not found'));

// Global error handler to catch outstanding errors our middleware doesn't find
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Instructs server to listen on a given port that was already specified
app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port.')
})
  
module.exports = app;