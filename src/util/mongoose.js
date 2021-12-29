module.exports = {
    mutipleMongooseToObject: function (mongooseArray) {
        return mongooseArray.map((mongoose) => mongoose.toObject());
    },
    MongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
