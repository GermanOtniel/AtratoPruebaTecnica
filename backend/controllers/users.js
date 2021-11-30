const userModel = require('../models/User');
const modelResponse = require('../services/util/responses');
const creditCardService = require('../services/util/external_service');
const ObjectId = require('mongoose').Types.ObjectId;

const getExpirationDateOfCreditCard = (stringDate) => {
  const date = new Date(stringDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  return (
    (((month + 1) >= 10) ? 
    (month + 1) : 
    ('0' + (month + 1))) + '/' + String(year).slice(2, 4)
  );
};

const isValidObjectId = (id) => {
  if(ObjectId.isValid(id)){
      if((String)(new ObjectId(id)) === id)
          return true;        
      return false;
  }
  return false;
}

module.exports = {
  /** 
   * Create a new user
   * 
   * POST /api/users/
   * body: {
   *   email: String,
   *   analist_id: ObjectId,
   *   birth_date: Date,
   *   first_name: String,
   *   second_name: String,
   *   first_last_name: String,
   *   second_last_name: String,
   *   phone_number: String,
   *   status: String
   * }
   * **/
  async create(req, res) {
    try {
      const creditCard = await creditCardService.creditCardRequest();
      const userCreated = await userModel.create({
        email: req.body.email,
        analist_id: req.body.analist_id,
        birth_date: req.body.birth_date,
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        first_last_name: req.body.first_last_name,
        second_last_name: req.body.second_last_name,
        phone_number: req.body.phone_number,
        status: req.body.status,
        card_number: creditCard.data.cardNumber,
        cvv: creditCard.data.cvv,
        pin: creditCard.data.pin,
        exp: getExpirationDateOfCreditCard(creditCard.data.date)
      });
      return modelResponse.sucess_Ok(res)('Usuario creado correctamente', {
        user: userCreated
      });
    } catch (error) {
      return modelResponse.handle_duplicate_errors(res)(
        error, 
        typeof error === 'string' ? error : ''
      );
    }
  },
  /** 
   * Create a new user
   * 
   * POST /api/users/:id
   * params: id || String
   * body: {
   *   email: String,
   *   analist_id: ObjectId,
   *   birth_date: Date,
   *   first_name: String,
   *   second_name: String,
   *   first_last_name: String,
   *   second_last_name: String,
   *   phone_number: String,
   *   status: String
   * }
   * **/
  update(req, res) {
    return userModel.updateOne({
      _id: req.params.id
    }, {
      "$set": {
        _id: req.params.id,
        email: req.body.email,
        analist_id: req.body.analist_id,
        birth_date: req.body.birth_date,
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        first_last_name: req.body.first_last_name,
        second_last_name: req.body.second_last_name,
        phone_number: req.body.phone_number,
        status: req.body.status,
      }
    }, { runValidators: true, context: 'query' })
    .then((result) => {
      return modelResponse.sucess_Ok(res)('Usuario actualizado correctamente', {
        user: result
      });
    })
    .catch((error) => {
      return modelResponse.handle_duplicate_errors(res)(error);
    });
  },
  /** 
   * Create a new user
   * 
   * GET /api/users/oldest
   * params:
   * body: {}
   * **/
   getOldest(req, res) {
    return userModel.findOne({ 
      status: 'PENDIENTE'
    }, 
    {}, 
    { sort: { 'created_at' : 1 } })
    .select('_id first_name first_last_name created_at')
    .then((result) => {
      return modelResponse.sucess_Ok(res)('Usuario rezagado', {
        user: result
      });
    })
    .catch((error) => {
      return modelResponse.internal_server(res)(error);
    });
  },
  /** 
   * Create a new user
   * 
   * GET /api/users/
   * query: {
   *   search: string,
   *   resPerPage: string | required,
   *   page: string | required,
   *   status: string
   * }
   * params:
   * body: {}
   * **/
  getAllPerPage(req, res) {
    let where = {};
    if (req.query.search) {
      where['$or'] = [
        { first_name: new RegExp(req.query.search, 'i') },
        { second_name: new RegExp(req.query.search, 'i') },
        { first_last_name: new RegExp(req.query.search, 'i') },
        { second_last_name: new RegExp(req.query.search, 'i') },
        { email: new RegExp(req.query.search, 'i') }
      ]
      if (isValidObjectId(req.query.search)) where['$or'].push({
        _id: new ObjectId(req.query.search)
      })
    }
    if (req.query.status) {
      where['status'] = req.query.status;
    }
    let pagination = {
      skip: (
        Number(req.query.resPerPage) * 
        Number(req.query.page) - Number(req.query.resPerPage)),
      limit: Number(req.query.resPerPage)
    };

    return userModel.find(where)
    .skip(pagination.skip)
    .limit(pagination.limit)
    .populate({
      path: 'analist_id',
      select:'full_name'
    })
    .then(async (result) => {
      const total = await userModel.countDocuments(where);
      const allTotal = await userModel.countDocuments();
      return modelResponse.sucess_Ok(res)('Listado de usuarios', {
        rows: result, total, allTotal
      });
    })
    .catch((error) => {
      return modelResponse.internal_server(res)(error);
    })
  },
    /** 
   * Create a new user
   * 
   * DELETE /api/users/:id
   * params: id || String
   * **/
     delete(req, res) {
      return userModel.findOneAndRemove({ _id: req.params.id })
      .then((result) => {
        return modelResponse.sucess_Ok(res)('Usuario eliminado correctamente', {
          user: result
        });
      })
      .catch((error) => {
        return modelResponse.internal_server(res)(error);
      });
    },
};