const express = require("express");
const router = express.Router();
const { 
  validationBody, validationBodyId, validationQueryParams 
} = require("../middlewares/validations");
const schemas_validations = require("../services/util/schemas/users");
const usersController = require("../controllers/users");

router.get("/test", (req, res) => {
  res.status(200).send({
    message: "Welcome to the users API"
  });
});

router.post(
  "/",
  validationBody(schemas_validations.user_create),
  usersController.create
);

router.put(
  "/:id",
  validationBodyId(schemas_validations.user_update),
  usersController.update
);

router.patch(
  "/:id",
  validationBodyId(schemas_validations.user_update),
  usersController.update
);

router.get(
  "/oldest",
  usersController.getOldest
);

router.get(
  "/",
  validationQueryParams(schemas_validations.users_list),
  usersController.getAllPerPage
);

router.delete(
  "/:id",
  validationBodyId(schemas_validations.user_delete),
  usersController.delete
);

module.exports = router;