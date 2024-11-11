const {
  successResponseData,
  successResponse,
  errorServerResponse,
  errorClientResponse,
} = require("@/helpers/responseHelpers");
const { Customer, Address, Order } = require("@/models");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: {
        model: Address,
        as: "addresses",
      },
    });
    return successResponseData(res, "success get all customers", customers);
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const findOneCustomer = async (id) => {
  try {
    const customer = await Customer.findOne({
      where: { cs_id: id },
    });
    return customer;
  } catch (error) {
    return;
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await findOneCustomer(id);
    if (!customer) {
      return errorClientResponse(res, "customer not found", 404);
    }
    return successResponseData(res, "success get customer", customer, 200);
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const getCustomeraddress = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOne({
      include: {
        model: Address,
        as: "addresses",
      },
      where: { cs_id: id },
    });
    if (!customer) {
      return errorClientResponse(res, "customer not found");
    }
    return successResponseData(res, "success get customer", customer);
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const getCustomerOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOne({
      include: {
        model: Order,
        as: "orders",
      },
      where: { cs_id: id },
    });
    if (!customer) {
      return errorClientResponse(res, "customer not found");
    }
    return successResponseData(res, "success get customer", customer);
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, gender, birth } = req.body;
    const customer = await Customer.create({
      cs_firstname: firstName,
      cs_lastname: lastName,
      cs_gender: gender,
      cs_birth: birth,
    });
    return successResponseData(res, "success create customer", customer);
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, gender, birth } = req.body;
    const customer = await findOneCustomer(id);
    if (!customer) {
      return errorClientResponse(res, "customer not found");
    }

    await Customer.update(
      {
        cs_firstname: firstName,
        cs_lastname: lastName,
        cs_gender: gender,
        cs_birth: birth,
      },
      { where: { cs_id: id } }
    );
    return successResponse(res, "Success update customer");
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await findOneCustomer(id);
    if (!customer) {
      return errorClientResponse(res, "customer not found");
    }
    await Customer.update({ is_active: false }, { where: { cs_id: id } });
    return successResponse(res, "Success delete customer");
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

module.exports = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomeraddress,
  getCustomerOrder,
  getCustomerById,
};
