'use strict';

var express = require('express');
var cors = require('cors');
const fileUpload = require('express-fileupload');

// require and use "multer"...

var app = express();

app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res) {
  res.json({ greetings: 'Hello, API' });
});

app.post('/api/fileanalyse', function(req, res) {
  if (!req.files) {
    res.send({ status: false, message: 'No file uploaded' });
  } else {
    let file = req.files.upfile;
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    //file.mv('./uploads/' + file.name);
    //res.send({ status: true, message: 'File uploaded' });
    res.json({ name: file.name, type: file.mimetype, size: file.size });
  }
});

const port = 5919;
app.listen(port, function() {
  console.log('Node.js listening on the port ' + port + '...');
});
