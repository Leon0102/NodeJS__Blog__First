const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');
const coursesRouter = require('./courses');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);

    // app.get('/', (req, res) => {
    // res.render('home');
    // })
    // app.post('/search', (req, res) => {
    // console.log(req.body.q);
    // res.render('search');
    // })
}

module.exports = route;
