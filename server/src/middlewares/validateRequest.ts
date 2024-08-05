import { ValidationError, validationResult } from "express-validator";
import { RequestHandler } from "express";

const validateRequest: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err: ValidationError) => {
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
