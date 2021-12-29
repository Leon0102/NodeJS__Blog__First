const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        // Call back--------------

        // Course.find({}, function(err, courses) {
        //     if(!err){
        //         res.json(courses);
        //         // return;
        //     }
        //     else{
        //         next(err);
        //         // res.status(400).json({error: 'ERROR!!!!'});
        //     }
        // });

        // Promise-----------------
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);

        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
