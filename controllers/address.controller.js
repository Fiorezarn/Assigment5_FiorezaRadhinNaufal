const {
  successResponseData,
  successResponse,
  errorServerResponse,
  errorClientResponse,
} = require("@/helpers/responseHelpers");
const { Address, Customer } = require("@/models");

const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      include: {
        model: Customer,
        as: "customer",
      },
    });
    return successResponseData(res, "Success get all addresses", addresses);
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const createAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { street, city, postalCode } = req.body;
    const address = await Address.create({
      ad_street: street,
      ad_city: city,
      ad_postalCode: postalCode,
      ad_cs_id: id,
    });
    return successResponseData(res, "Success create address", address);
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { street, city, postalCode } = req.body;
    const address = await Address.findOne({ where: { ad_id: id } });
    if (!address) {
      return errorClientResponse(res, "Address not found");
    }

    await Address.update(
      {
        ad_street: street,
        ad_city: city,
        ad_postalCode: postalCode,
      },
      { where: { ad_id: id } }
    );
    return successResponse(res, "Success update address");
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findOne({ where: { ad_id: id } });
    if (!address) {
      return errorClientResponse(res, "Address not found");
    }

    await Address.destroy({ where: { ad_id: id } });
    return successResponse(res, "Success delete address");
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

module.exports = {
  getAllAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};
