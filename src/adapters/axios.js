import axios from 'axios';

export const axiosInstance = async (
  method, url, data, setAlert, showSuccessAlert = false
) => {
  try {
    const response = await axios({
      method,
      url: process.env.REACT_APP_URL_REQUEST + url,
      data
    });
    if (response?.data?.code === 200) {
      if (
        response?.data?.data?.code !== 200 && 
        typeof response?.data?.data?.message === 'string'
      ) {
        setAlert(
          true,
          'right',
          response?.data?.data?.message,
          5000,
          'error'
        );
      } 
      if (
        response?.data?.data?.code === 200 &&
        !response?.data?.data?.error &&
        typeof response?.data?.data?.message === 'string' && 
        showSuccessAlert
      ) {
        setAlert(
          true,
          'right',
          response?.data?.data?.message,
          5000,
          'success'
        );
      }
      return {
        code : response.data.data?.code || 500,
        data: response.data.data || null
      }
    }
  } catch (error) {
    console.log(error.message);
    setAlert(
      true,
      'right',
      'Error Internal Server 500 ' + (error?.message || ''),
      5000,
      'error'
    );
  }
};