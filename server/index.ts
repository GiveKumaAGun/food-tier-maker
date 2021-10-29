import express from 'express';
import path from 'path'

const app: express.Application = express()
// app.set('views', require('path').join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use('/books', require('./books/crud'));
// app.use('/api/books', require('./books/api'));

// Redirect root to /books
app.get('/', (req, res) => {
  res.send('landing')
})

app.get('/api/hello', (req, res) => {
  res.send('Hello World');
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});