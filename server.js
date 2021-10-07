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











app.listen(PORT, () => console.log(`Server started on port ${PORT}`))