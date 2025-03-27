const Topic = require("../models/topic.Model");

exports.getTopicsByCourseID = async (req, res) => {
    try {
        const courseId = req.params.courseID; // Get courseID from request params

        // Find topics where the courseId matches the given courseID
        const topics = await Topic.find({ courseId: courseId }); 

        console.log("Course ID:", courseId);
        console.log("Topics:", topics);

        return res.status(200).json(topics);
    } catch (error) {
        console.error("Error fetching topics:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
