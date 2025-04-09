import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

function Article(title, content) {
  this.title = title;
  this.content = content;
}

var articleList = [
  new Article('article 1', 'this is the content of article 1'),
  new Article('article 2', 'this is the content of article 2'),
];

app.get('/', (req, res) => {
  res.render('index.ejs', { articleList });
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/new', (req, res) => {
  var newTitle = req.body.title;
  var newContent = req.body.content;
  articleList.push(new Article(newTitle, newContent));
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  var id = parseInt(req.params.id);
  var article = articleList[id];
  res.render('edit.ejs', { id, article });
});

app.post('/edit/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (req.body.title) {
    articleList[id].title = req.body.title;
  }
  if (req.body.content) {
    articleList[id].content = req.body.content;
  }

  res.redirect('/');
});

app.get('/view/:id', (req, res) => {
  var id = parseInt(req.params.id);
  var article = articleList[id];
  res.render('view.ejs', { id, article });
});

app.get('/delete/:id', (req, res) => {
  var id = parseInt(req.params.id);
  var article = articleList[id];
  res.render('delete.ejs', { id, article });
});

app.post('/delete/:id', (req, res) => {
  var id = parseInt(req.params.id);
  articleList.splice(id, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
