// User Story 1: Custom Request Logger

//  Log every request

module.exports = function (req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(` [${timestamp}] ${req.method} ${req.url}`);
    next(); // Continue to next middleware or route
};
