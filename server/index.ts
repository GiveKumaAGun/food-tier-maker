const path = require('path')
const express = require('express');

const app = express();

// app.set('views', require('path').join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use('/books', require('./books/crud'));
// app.use('/api/books', require('./books/api'));

// Redirect root to /books
app.use(express.static(path.resolve(__dirname, "..", "build")))

app.get('/hello', (req, res) => {
  res.send('Hello World');
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
