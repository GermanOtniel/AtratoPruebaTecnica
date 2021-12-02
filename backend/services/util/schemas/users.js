const Joi = require("@hapi/joi");

const schemas = {
  user_create: Joi.object().keys({
    email: Joi.string().email().required(),
    analist_id: Joi.string().required(),
    birth_date: Joi.date().required(),
    first_name: Joi.string().required(),
    second_name: Joi.string().allow(""),
    first_last_name: Joi.string().required(),
    second_last_name: Joi.string().allow(""),
    phone_number: Joi.string().required(),
    status: Joi.string().required().valid("PENDIENTE", "EN PROCESO", "COMPLETADO"),
  }),
  user_update: Joi.object().keys({
    id: Joi.string().required(),
    email: Joi.string().email().required(),
    analist_id: Joi.string().required(),
    birth_date: Joi.date().required(),
    first_name: Joi.string().required(),
    second_name: Joi.string().allow(""),
    first_last_name: Joi.string().required(),
    second_last_name: Joi.string().allow(""),
    phone_number: Joi.string().required(),
    status: Joi.string().required().valid("PENDIENTE", "EN PROCESO", "COMPLETADO"),
  }),
  users_list: Joi.object().keys({
    page: Joi.string().required(),
    resPerPage: Joi.string().required(),
    status: Joi.string().allow("").valid("PENDIENTE", "EN PROCESO", "COMPLETADO"),
    search: Joi.string().allow("")
  }),
  user_delete: Joi.object().keys({
    id: Joi.string().required()
  })
};

module.exports = schemas;