// import express using common.js modules //
// Currently, Node.js only supports common.js modules - 'import' no support for es2015 modules yet //
const express = require('express');
// require services/passport config //
require('./services/passport');

// set up application //
const app = express();
// require authRoutes function and execute it with the express app object //
require('./routes/authRoutes')(app);

// heroku dynamic port from injected environment variables //
const PORT = process.env.PORT || 5000;
// instruct Node to listen on port //
app.listen(PORT);
