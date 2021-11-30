import axios from 'axios';
import { renderErrorAlertMsg, renderSuccessAlertMsg } from '../util/handleErrors';

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
        renderErrorAlertMsg(setAlert, response.data.data.message);
      } 
      if (
        response?.data?.data?.code === 200 &&
        !response?.data?.data?.error &&
        typeof response?.data?.data?.message === 'string' && 
        showSuccessAlert
      ) {
        renderSuccessAlertMsg(setAlert, response.data.data.message);
      }
      return {
        code : response.data.data?.code || 500,
        data: response.data.data || null
      }
    }
  } catch (error) {
    renderErrorAlertMsg(setAlert, (error?.message || ''));
  }
};