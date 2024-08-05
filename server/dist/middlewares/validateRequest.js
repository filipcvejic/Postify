import { validationResult } from "express-validator";
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((err) => {
            switch (err.type) {
                case "field": {
                    return {
                        field: err.path,
                        message: err.msg,
                    };
                }
            }
        });
        return res.status(400).json({ errors: formattedErrors });
    }
    next();
};
export default validateRequest;
