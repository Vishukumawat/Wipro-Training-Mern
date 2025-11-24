const Enrollment = require("./enrollmentModel");

exports.getEnrollments = async (req, res) => {
    try {
        const data = await Enrollment.find().populate("user");
        res.json(data);
    } catch (err) {
        console.error(" Error in getEnrollments:", err); //  ADD THIS
        res.status(500).json({
            error: "Failed to fetch enrollment data",
            details: err.message //  optional, helps debugging
        });
    }
};
