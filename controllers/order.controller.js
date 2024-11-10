const {
  successResponseData,
  successResponse,
  errorServerResponse,
  errorClientResponse,
} = require("@/helpers/responseHelpers");
const { Order, Customer } = require("@/models");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: Customer,
        as: "customer",
      },
    });
    return successResponseData(res, "Success get all orders", orders);
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { totalAmount, status } = req.body;
    const order = await Order.create({
      or_totalAmount: totalAmount,
      or_status: status || "pending",
      or_cs_id: id,
    });
    return successResponseData(res, "Success create order", order);
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { totalAmount, status } = req.body;
    const order = await Order.findOne({ where: { or_id: id } });
    if (!order) {
      return errorClientResponse(res, "Order not found");
    }

    await Order.update(
      {
        or_totalAmount: totalAmount,
        or_status: status,
      },
      { where: { or_id: id } }
    );
    return successResponse(res, "Success update order");
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { or_id: id } });
    if (!order) {
      return errorClientResponse(res, "Order not found");
    }

    await Order.destroy({ where: { or_id: id } });
    return successResponse(res, "Success delete order");
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
