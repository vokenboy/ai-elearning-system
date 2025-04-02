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
