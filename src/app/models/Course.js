const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CourseSChema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, default: '', maxLength: 255 },
        description: { type: String, default: '', maxLength: 600 },
        videoId: { type: String },
        image: { type: String, default: '' },
        level: { type: String, default: '' },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

CourseSChema.plugin(AutoIncrement, { inc_field: '_id' });

// Custom query helpers
CourseSChema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query._sort);
        return this.sort({
            [req.query.column]: isValidtype ? req.query._sort : 'asc',
        });
    }
    return this;
};

// Add plugins
mongoose.plugin(slug);
CourseSChema.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', CourseSChema);
