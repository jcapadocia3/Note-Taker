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

// GET route to retrieve all stored notes
app.get("/api/notes", (req, res) =>
  fs.readFile(path.join(__dirname, './db/db.json'), "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  }));

// POST route to add new notes to store notes
app.post('/api/notes', (req, res) => {

  // Reads data in db.json file
  fs.readFile(path.join(__dirname, './db/db.json'), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
  
    // Destructuring assigment for items in req.body
    const { title, text } = req.body;
    const notes = JSON.parse(data);
  
    // All required properties must be present in new note before it's added
    if (req.body) {
      const newNote = {
        title,
        text,
        // Imports function from uuid.js to assign a unique ID to new note
        id: uuid(),
      };

      notes.push(newNote)
      res.json(newNote);
  
      // Writes note to db.json file
      fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), "utf-8", (err) => {
        if (err) throw err; console.log("new note added!")
      });      
    };
  })
});





// LISTENS to ensure app is active on designated PORT
app.listen(PORT, () => console.log(`Listening to server on port ${PORT}`));