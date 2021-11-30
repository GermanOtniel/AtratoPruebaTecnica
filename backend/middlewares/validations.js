const modelReponse = require('../services/util/responses');

const validationBody = (schema, property) => {
  return (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  const valid = error == null;
  
  if (valid) {
    next();
  } else {
    const { details } = error;
    let mapMessage = details.map((detailError) => {
      detailError.behindMessage = detailError.message;
      detailError.message = 'Campo inválido';
      return detailError;
    });
      return modelReponse.not_unprocessable_entity(res)('Error de validación: Revisa los campos marcados en rojo', {
        errors: mapMessage,
      });
    }
  };
};

const validationParams = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    const valid = error == null;
  
    if (valid) {
      next();
    } else {
      const { details } = error;
      let mapMessage = details.map((detailError) => {
        detailError.behindMessage = detailError.message;
        detailError.message = 'Campo inválido';
        return detailError;
      });
      return modelReponse.not_unprocessable_entity(res)('Error de validación', {
        errors: mapMessage,
      });
    }
  };
};

const validationBodyId = (schema, property) => {
  return (req, res, next) => {
    req.body.id = req.params.id;
    var { error } = schema.validate(req.body, { abortEarly: false });
    var valid = error == null;
    if (valid) {
      next();
    } else {
      var { details } = error;
      let mapMessage = details.map((detailError) => {
        detailError.behindMessage = detailError.message;
        detailError.message = 'Campo inválido';
        return detailError;
      });
      return modelReponse.not_unprocessable_entity(res)('Error de validación: Revisa los campos marcados en rojo', {
        errors: mapMessage,
      });
    }
  };
};

const validationQueryParams = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, { abortEarly: false });
    const valid = error == null;
  
    if (valid) {
      next();
    } else {
      const { details } = error;
      let mapMessage = details.map((detailError) => {
        detailError.behindMessage = detailError.message;
        detailError.message = 'Campo inválido';
        return detailError;
      });
      return modelReponse.not_unprocessable_entity(res)('Error de validación', {
        errors: mapMessage,
      });
    }
  };
};

module.exports = {
  validationParams, 
  validationBody,
  validationBodyId,
  validationQueryParams
};