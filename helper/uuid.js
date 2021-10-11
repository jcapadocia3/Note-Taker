// Function to generate a random number as a unique ID
// Exports to server.js file
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x100)