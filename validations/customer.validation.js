const Joi = require("joi");
const { Customer } = require("@/models");
const {
  errorServerResponse,
  errorClientResponse,
} = require("@/helpers/responseHelpers");

const bodyvalidation = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    birth: Joi.date().required(),
  });
  const validationError = schema.validate(req.body).error;
  if (validationError) {
    return errorClientResponse(res, validationError.details[0].message);
  }
  next();
};

const checkDuplicates = async (req, res, next) => {
  const { firstName, lastName } = req.body;
  const customer = await Customer.findOne({
    where: {
      cs_firstname: firstName,
      cs_lastname: lastName,
    },
  });
  if (customer) {
    return errorClientResponse(res, "Customer already exists", 409);
  }
  next();
};

module.exports = {
  bodyvalidation,
  checkDuplicates,
};
