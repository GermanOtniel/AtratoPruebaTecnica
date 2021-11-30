const Joi = require('@hapi/joi');

const schemas = {
  analyst_create: Joi.object().keys({
    full_name: Joi.string().required()
  })
};

module.exports = schemas;