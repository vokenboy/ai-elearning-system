const Course = require("../models/course.Model");

exports.saveCourse = async (req, res) => {
    try {
      const { title, description, difficulty } = req.body;
      if (!title || !description || !difficulty) {
        return res
          .status(400)
          .json({ error: "Please provide all required fields" });
      }
  
  
      const course = new Course({ title, description, difficulty});
      await course.save();
  
      res.status(201).json({ message: "Course saved successfully", course });
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

//kurso salinimas

exports.deleteCourse = async (req, res) => {
    try {
      const {id} = req.params;
      const course = await Course.findByIdAndDelete(id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Server error" });
    }
};
  