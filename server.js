const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})



app.get('/api/notes', (req, res) => {
 res.json(database);
});







const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };


app.post('/api/notes', (req, res) => {
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        // note_id: uuid(),
      };
  
      readAndAppend(newNote, '/db/db.json');
      res.json(`Note added!`);
    } else {
      res.error('Error adding Note :(');
    }
  });









app.listen(PORT, () => console.log(`Server started on port ${PORT}`))