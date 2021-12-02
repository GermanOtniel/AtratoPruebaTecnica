import axios from "axios";
import { detectIfAnErrorOcurred, renderErrorAlertMsg, renderSuccessAlertMsg } from "../util/handleErrors";

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
      detectIfAnErrorOcurred(response, setAlert, showSuccessAlert);
      
      return {
        code : response.data.data?.code || 500,
        data: response.data.data || null
      }
    }
  } catch (error) {
    renderErrorAlertMsg(setAlert, (error?.message || ""));
  }
};