
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
  
