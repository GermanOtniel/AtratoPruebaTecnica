const sucess_Ok = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Ok";
    }
    return res(response, true, 200, false, 200, message, data);
  };
};

const not_unprocessable_entity = (response) => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Validation error";
    }
    return res(response, false, 200, true, 422, message, data);
  };
};

const internal_server = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Internal Server error";
    }
    return res(response, false, 500, true, 500, message, data);
  };
};

const handle_duplicate_errors = (response) => {
  return (err, msg = "Internal Server Error") => {
    if ((err && err.errors) && typeof err.errors === "object") {
      const arrayErrorsMessage = Object.values(err.errors);
      if (arrayErrorsMessage && arrayErrorsMessage.length > 0) {
        if (arrayErrorsMessage[0]["properties"]) {
          const errors = arrayErrorsMessage[0]["properties"];
          const code = 400;
          const message = "Por favor revisa los campos marcados en rojo y corrígelos";
          return res(response, false, 200, true, code, message, { 
            errors: {
              [errors.path]: errors.message
            }});
        }
      } 
    }
    return res(response, false, 500, true, 500, msg, {});
  };
};

function res(response, status, code, error, insideCode, message, data) {
  let responseBody = {
    status,
    code,
    data: {
      error,
      code: insideCode,
      message,
      ...data
    }
  };

  return response.status(responseBody.code).send(responseBody);
}

module.exports = {
  not_unprocessable_entity,
  sucess_Ok,
  internal_server,
  handle_duplicate_errors
};