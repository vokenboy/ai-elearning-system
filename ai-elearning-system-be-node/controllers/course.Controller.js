const Course = require("../models/course.Model");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const os = require("os");
const { randomUUID } = require("crypto");
const User = require("../models/user.Model");

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.saveCourse = async (req, res) => {
    try {
        const { title, description, difficulty } = req.body;
        if (!title || !description || !difficulty) {
            return res
                .status(400)
                .json({ error: "Please provide all required fields" });
        }

        const course = new Course({ title, description, difficulty });
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
        const { id } = req.params;
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

//kurso redagavimas
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, difficulty } = req.body;

        if (!title || !description || !difficulty) {
            return res
                .status(400)
                .json({ error: "Please provide all required fields" });
        }

        //atnaujina kursa pagal id
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { title, description, difficulty },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json({
            message: "Course updated successfully",
            course: updatedCourse,
        });
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// gauti kursa pagal id
exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json(course);
    } catch (error) {
        console.error("Error getting course:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getCourseCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const certificateFilename = `${course.title.replace(
            /\s+/g,
            "_"
        )}_${randomUUID()}.pdf`;
        const completionDate = new Date().toISOString().split("T")[0];

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${certificateFilename}"`
        );

        const doc = new PDFDocument({ size: "A4", margin: 50 });
        doc.pipe(res);

        const { width: pWidth, height: pHeight } = doc.page;
        doc.image("./resources/texture.jpg", 0, 0, {
            width: pWidth,
            height: pHeight,
        });
        doc.image("./resources/CertificateLogo.png", pWidth / 2 - 200, 10, {
            width: 400,
        });
        doc.image("./resources/border.png", 0, 0, {
            width: pWidth,
            height: pHeight,
        });

        doc.moveDown(20)
            .fontSize(24)
            .font("Helvetica-Bold")
            .text("OFFICIAL LECON CERTIFICATE OF COMPLETION", {
                align: "center",
                valign: "center",
            })
            .moveDown(3)
            .fontSize(15)
            .font("Helvetica")
            .text(`For completing Lecon's '${course.title}' course`, {
                align: "center",
            })
            .text(
                "During the course, the student acquired theoretical knowledge and practical programming skills.",
                { align: "center" }
            )
            .moveDown(7)
            .fontSize(9)
            .text(`Course difficulty: ${course.difficulty}`, {
                align: "center",
            })
            .text(`Completed at: ${completionDate}`, { align: "center" })
            .text("Certificate provided by: Lecon", { align: "center" });

        doc.end();
    } catch (error) {
        console.error("Error generating certificate:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Server error" });
        }
    }
};
