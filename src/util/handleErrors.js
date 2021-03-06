
export const handleFailedResponse = (response, setErrors) => {
  if (response?.code === 422) {
    parseErrorMessageArray(response?.data?.errors || [], setErrors);
  }
  if (response?.code === 400) {
    setErrors(response.data?.errors || {});
  }
};

export const parseErrorMessageArray = (errors, setFormErrors) => {
  let errorObj = {};
  errors.forEach(el => {
    const { key } = el.context;
    const { message } = el;
    errorObj = { ...errorObj, [key]: message };
  });
  setFormErrors(errorObj);
};

export const detectIfAnErrorOcurred = (response, setAlert, showSuccessAlert) => {
  if (
    response?.data?.data?.code !== 200 && 
    typeof response?.data?.data?.message === "string"
  ) {
    renderErrorAlertMsg(setAlert, response.data.data.message);
  } 
  if (
    response?.data?.data?.code === 200 &&
    !response?.data?.data?.error &&
    typeof response?.data?.data?.message === "string" && 
    showSuccessAlert
  ) {
    renderSuccessAlertMsg(setAlert, response.data.data.message);
  }
};

export const renderErrorAlertMsg = (setAlert, message) => {
  setAlert(
    true,
    "right",
    message || "Ha ocurrido un error inesperado, inténtalo más tarde...",
    5000,
    "error"
  );
};

export const renderSuccessAlertMsg = (setAlert, message) => {
  setAlert(
    true,
    "right",
    message || "¡La acción se ha efectuado exitosamente!",
    5000,
    "success"
  );
};
