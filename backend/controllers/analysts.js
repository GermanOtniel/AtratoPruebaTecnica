const analystModel = require("../models/Analyst");
const modelResponse = require("../services/util/responses");

module.exports = {
  /** 
   * Create a new analyst
   * 
   * POST /api/analysts/
   * body: {
   *  full_name: STRING|REQUIRED
   * }
   * **/
  create(req, res) {
    return analystModel.create({
      full_name: req.body.full_name
    })
    .then((result) => {
      return modelResponse.sucess_Ok(res)("Analista creado correctamente", {
        analyst: result
      });
    })
    .catch((error) => {
      return modelResponse.internal_server(res)(error.message);
    });
  },
  /** 
   * List all analysts
   * 
   * GET /api/analysts/
   * 
   * **/
  list(req, res) {
    return analystModel.find()
    .select("_id full_name")
    .then((analysts) => {
      return modelResponse.sucess_Ok(res)("Analistas existentes", {
        analysts: analysts.map(analyst => ({ 
          value: analyst._id, label: analyst.full_name 
        }))
      });
    })
    .catch((error) => {
      return modelResponse.internal_server(res)(error.message);
    });
  }
};