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