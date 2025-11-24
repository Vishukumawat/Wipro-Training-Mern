const Instructor = require("./instructorModel");
const Course = require("./courseModel");

// One-to-Many Relationship Setup
Instructor.hasMany(Course);
Course.belongsTo(Instructor);

// GET /orm/instructor/:id/courses
exports.getCourses = async (req, res) => {
    try {
        const instructor = await Instructor.findByPk(req.params.id, {
            include: Course
        });

        res.json(instructor);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch courses" });
    }
};

