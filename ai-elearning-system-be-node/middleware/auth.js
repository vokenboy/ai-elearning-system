const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

exports.authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res
                .status(401)
                .json({ message: "Unauthorized - Not authenticated" });
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message:
                    "Forbidden - You do not have permission to perform this action",
            });
        }

        next();
    };
};
