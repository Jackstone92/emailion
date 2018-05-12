// import express using common.js modules //
// Currently, Node.js only supports common.js modules - 'import' no support for es2015 modules yet //
const express = require('express');

// set up application //
const app = express();

// create a route handler and associate it with a given route //
app.get('/', (req, res) => {
  res.send({ bye: 'buddy' });
});

// heroku dynamic port from injected environment variables //
const PORT = process.env.PORT || 5000;
// instruct Node to listen on port //
app.listen(PORT);
