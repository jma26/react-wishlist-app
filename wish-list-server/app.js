const express = require('express');
const path = require('path');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store files in 'uploads' directory
    cb(null, './uploads');
  }
});

// Multer instance to upload/save files
const upload = multer({ storage });

app.post('/upload', upload.single('selectedFile'), (req, res) => {
  console.log(req);
})

const port = 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
