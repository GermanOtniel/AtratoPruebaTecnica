const axios = require("axios");

function creditCardRequest() {
  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        method: "GET",
        url: process.env.RANDOMMER_API,
        headers: {
          "X-Api-Key": process.env.API_KEY_RANDOMMER
        }
      }
      let response = await axios(config);
      resolve(response);
    } catch (error) {
      reject("Falló la conexión con Randommer API, inténtalo más tarde");
    }
  });
};

module.exports = {
  creditCardRequest
};