// Create web server application with Express
// to handle comments on a blog post.
// ==================================================

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Initialize express application
const app = express();

// Set port number
const port = 3000;

// Set static directory for serving static files
app.use(express.static('public'));

// Set template engine to EJS
app.set('view engine', 'ejs');

// Set body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set route for home page
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Set route for comments page
app.get('/comments', (req, res) => {
  // Read comments from comments.json file
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // Parse comments to JSON format
      const comments = JSON.parse(data);
      res.render('comments', { title: 'Comments', comments: comments });
    }
  });
});

// Set route for new comment page
app.get('/new-comment', (req, res) => {
  res.render('new-comment', { title: 'New Comment' });
});

// Set route for sending new comment
app.post('/new-comment', (req, res) => {
  // Read comments from comments.json file
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // Parse comments to JSON format
      const comments = JSON.parse(data);
      // Add new comment to comments array
      comments.push(req.body);
      // Write comments to comments.json file
      fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Comment saved!');
          // Redirect to comments page
          res.redirect('/comments');
        }
      });
    }
  });
});

// Start web server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
