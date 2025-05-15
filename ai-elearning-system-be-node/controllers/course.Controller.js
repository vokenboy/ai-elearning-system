const Course = require("../models/course.Model");
const PDFDocument = require("pdfkit");
const fs = require('fs');
const os = require('os');
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
    try{
        const {id} = req.params;
        const {title, description, difficulty} = req.body;

        if (!title || !description || !difficulty){
            return res.status(400).json({error: "Please provide all required fields"});
        }

        //atnaujina kursa pagal id
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            {title, description, difficulty},
            {new: true}
        );

        if (!updatedCourse){
            return res.status(404).json({error: "Course not found"});

        }
        res.status(200).json({message: "Course updated successfully", course: updatedCourse});
    }
    catch (error){
        console.error("Error updating course:", error);
        res.status(500).json({error: "Server error"});
    }

};

// gauti kursa pagal id
exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id).select('title description'); 

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

        const certificateDocument = new PDFDocument();
        const pHeight = certificateDocument.page.height;
        const pWidth = certificateDocument.page.width;
        const certificateDocumentName = course.title + randomUUID();
        const certificateDocumentDestination = os.tmpdir() + '\\' + certificateDocumentName + '.pdf';
        const certificateCompletionDate = new Date().toISOString().split('T')[0];

        certificateDocument.pipe(fs.createWriteStream(certificateDocumentDestination));
        certificateDocument.image('./resources/texture.jpg',0,0,{width: pWidth, height: pHeight});
        certificateDocument.image('./resources/CertificateLogo.png',pWidth/2-200, 10, {width: 400});
        certificateDocument.image('./resources/border.png',0,0,{width: pWidth, height: pHeight});
        certificateDocument.moveDown(20);
        certificateDocument.fontSize(24);
        certificateDocument.font(`Helvetica-Bold`)
        .text(`OFFICIAL LECON CERTIFICATE OF COMPLETION`, { align: 'center', valign: 'center'});
        certificateDocument.moveDown(3);
        certificateDocument.fontSize(15);
        certificateDocument.font('Helvetica');
        certificateDocument.text(`For completing Lecon's '${course.title}' course`, { align: 'center', valign: 'center'});
        certificateDocument.text(`During the course, the student acquired theoretical knowledge and practical programming skills.`, { align: 'center', valign: 'center'});
        certificateDocument.moveDown(7);
        certificateDocument.fontSize(9);
        certificateDocument.text(`Course difficulty: ${course.difficulty}`, { align: 'center'});
        certificateDocument.text(`Completed at: ${certificateCompletionDate}`, { align: 'center'});
        certificateDocument.text(`Certificate provided by: Lecon`, { align: 'center'});

        certificateDocument.end();
        res.status(200).json({certificatePath: certificateDocumentDestination});
    } catch (error) {
        console.error("Error getting course:", error);
        res.status(500).json({ error: "Server error" });
    }
}