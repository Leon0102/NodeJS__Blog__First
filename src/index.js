const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const app = express();
const port = 800;

// USE static folder 
app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());

app.use(methodOverride('_method'));
// HTTP logger
// app.use(morgan('combined'))
// Template engine
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
// console.log('PATH: ', path.join(__dirname, 'resources/views'))
app.get('/', (req, res) => {
  res.render('home');
})
app.get('/news', (req, res) => {
  res.render('news');
})
app.get('/search', (req, res) => {
  // console.log(req.query)
  res.render('search');
})
app.post('/search', (req, res) => {

  console.log(req.body.q);

  res.render('search');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})