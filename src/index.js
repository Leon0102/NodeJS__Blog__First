const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const SortMiddleware = require('./app/middleware/SortMiddleware');

const app = express();
const port = 800;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

// USE static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// override with POST having ?_method=
app.use(methodOverride('_method'));
// HTTP logger
// app.use(morgan('combined'))

// Custom middleware
app.use(SortMiddleware);

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helper/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

// Local host -- Hosting

// Action -- Dispatcher --> Function handler
