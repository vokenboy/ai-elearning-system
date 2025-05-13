const Content = require("../models/content.Model");

exports.addContent = async (req, res) => {
    try {
        const { topic, language, description, tags, courseId } = req.body;
        const content = new Content({
            topic,
            language,
            description,
            tags,
            courseId,
        });
        console.log(req.body);
        await content.save();

        res.status(201).json({
            message: "Content added to the course",
            content,
        });
    } catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getContent = async (req, res) => {
    try {
        const contents = await Content.find();
        res.json(contents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getContentByCourseId = async (req, res) => {
    try {
        const contents = await Content.find({ courseId: req.params.courseId });
        res.json(contents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteContentById = async(req, res) => {
    try{
        const { contentId } = req.params;
        const content = await Content.findByIdAndDelete(contentId);
        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }

        res.status(200).json({ message: "Content deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateContentById = async(req, res) => {
    try{
        const { contentId } = req.params;
        const { topic, language, description, tags } = req.body;

        const content = await Content.findByIdAndUpdate(contentId,{topic, language, description, tags});
        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }

        res.status(200).json({ message: "Content updated successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getContentByContentId = async (req, res) => {
    try {
        const contentData = await Content.findById(req.params.contentId);
        res.json(contentData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};