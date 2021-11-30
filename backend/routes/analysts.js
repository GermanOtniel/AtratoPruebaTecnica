const express = require('express');
const router = express.Router();
const { validationBody } = require('../middlewares/validations');
const schemas_validations = require('../services/util/schemas/analysts');
const analystController = require('../controllers/analysts');

router.get('/test', (req, res) => {
  res.status(200).send({
    message: "Welcome to the analysts API"
  });
});

router.post(
  '/',
  validationBody(schemas_validations.analyst_create),
  analystController.create
);

router.get(
  '/',
  analystController.list
);

module.exports = router;