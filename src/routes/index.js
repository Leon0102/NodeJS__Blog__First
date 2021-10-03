const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    app.use('/news', newsRouter);

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
