const express = require('express');
const path = require('path');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  // Store files in 'uploads' directory
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  // 
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multer instance to upload/save files
const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req);
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
