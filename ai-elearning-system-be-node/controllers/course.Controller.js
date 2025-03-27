const Course = require("../models/course.Model")

exports.getCourses = async (req, res) => {
    const courses = await Course.find();
    return res.status(200).json(courses);
}