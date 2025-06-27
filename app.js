const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let posts = [];
let idCounter = 1;

// Home
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// New post form
app.get('/new', (req, res) => {
  res.render('new');
});

// Create new post
app.post('/new', (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    posts.push({ id: idCounter++, title, content });
  }
  res.redirect('/');
});

// Edit post form
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  res.render('edit', { post });
});

// Update post
app.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/');
});

// Delete post
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Muscle Blog running at http://localhost:${PORT}`);
});