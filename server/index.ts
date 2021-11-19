
import express from 'express';
import path from 'path'
import {format} from 'util';
import Multer from 'multer';
import {Storage} from '@google-cloud/storage'
import {v4 as uuidv4} from 'uuid';

const storage = new Storage();

const app: express.Application = express()
app.use(express.json());

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // no larger than 50mb, you can change as needed.
  },
});

const bucket = storage.bucket("test-bucket-please-ignore");

app.get('/', (req, res) => {
  res.send('Landing')
})

app.get('/api/hello', (req, res) => {
  res.send('Hello World');
});

app.post('/api/image/', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', err => {
    next(err);
  });


  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${"test123"}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});