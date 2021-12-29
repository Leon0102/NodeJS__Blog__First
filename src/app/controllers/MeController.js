const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class NewsController {
    // [GET]  /me/stored/courses
    storedCourse(req, res, next) {
        let coursesQuery = Course.find({});

        Promise.all([
            coursesQuery.sortable(req),
            Course.countDocumentsDeleted(),
        ])
            .then(([courses, count]) => {
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                    count,
                });
            })
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then(count => {
        //         res.render('me/stored-courses',{
        //             count: count
        //         });
        //     })
        //     .catch(next);

        //  Course.find({deleteAt: null})
        //         .then(courses =>
        //         {
        //             res.render('me/stored-courses',{
        //                 courses: mutipleMongooseToObject(courses)
        //             });
        //         })
        //         .catch(next);
    }
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new NewsController();
