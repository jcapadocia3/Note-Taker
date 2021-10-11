const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db/db.json')
// Helper method for generating a unique ID
const uuid = require('./helper/uuid');

// Uses all express package prewritten functionality and designates a PORT to run the app on
const app = express();
const PORT = process.env.PORT || 3001;

// Serves up all static files in directory "public"
app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// GET route for homepage
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// GET route for notes page
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

// Function to write data to the JSON file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// Function to read data from and to append/write content to it
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

// GET route to retrieve all stored notes
app.get('/api/notes', (req, res) => {
 res.json(database);
});

// POST route to add new notes to store notes
app.post('/api/notes', (req, res) => {
  
    // Destructuring assigment for items in req.body
    const { title, text } = req.body;
  
    // All required properties must be present in new note before it's added
    if (req.body) {
      const newNote = {
        title,
        text,
        // Imports function from uuid.js to assign a unique ID to new note
        note_id: uuid(),
      };
  
      // Reads new note information and appends/writes it to db.json
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added!`);
      database.push(newNote)
    } else {
      res.error('Error adding Note :(');
    }
  });





// LISTENS to ensure app is active on designated PORT
app.listen(PORT, () => console.log(`Listening to server on port ${PORT}`))