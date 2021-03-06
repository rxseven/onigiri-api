// Module dependencies
const Joi = require('joi');
const regex = require('../helpers/regex');

// Route middleware
module.exports = {
  // Validators
  validators: {
    // Request param
    param: (schema, name) => {
      return (req, res, next) => {
        // Validate a value using the given schema and options
        const result = Joi.validate({ param: req['params'][name] }, schema);

        // Error handler
        if (result.error) {
          return res.status(400).json({
            error: {
              message: result.error.details[0].message
            }
          });
        }

        // Assign validated value to a new property
        if (!req.value) req.value = {};
        if (!req.value['params']) req.value['params'] = {};
        req.value['params'][name] = result.value.param;

        // Call the next middleware
        next();
      };
    },

    // Request body
    body: schema => {
      return (req, res, next) => {
        // Validate a value using the given schema and options
        const result = Joi.validate(req.body, schema);

        // Error handler
        if (result.error) {
          return res.status(400).json({
            error: {
              message: result.error.details[0].message
            }
          });
        }

        // Assign validated value to a new property
        if (!req.value) req.value = {};
        if (!req.value['body']) req.value['body'] = {};
        req.value['body'] = result.value;

        // Call the next middleware
        next();
      };
    }
  },

  // Validation schemas
  schemas: {
    // ID (24 bit)
    id: Joi.object().keys({
      param: Joi.string()
        .regex(regex.mongoID)
        .required()
    }),

    // Sign-up
    signUp: Joi.object().keys({
      email: Joi.string()
        .required()
        .email(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required()
    }),

    // Sign-in
    signIn: Joi.object().keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string().required()
    }),

    // Create survey
    createSurvey: Joi.object().keys({
      body: Joi.string().required(),
      from: Joi.string(),
      landing: Joi.string(),
      recipients: Joi.string().required(),
      sender: Joi.string().required(),
      subject: Joi.string().required(),
      title: Joi.string().required()
    })
  }
};
