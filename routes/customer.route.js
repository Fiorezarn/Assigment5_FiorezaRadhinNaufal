const { createAddress } = require("@/controllers/address.controller");
const {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomeraddress,
  getCustomerOrder,
} = require("@/controllers/customer.controller");
const { createOrder } = require("@/controllers/order.controller");
const express = require("express");
const router = express.Router();

router.get("/", getAllCustomers);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.patch("/:id", deleteCustomer);
router.get("/:id/addresses", getCustomeraddress);
router.get("/:id/orders", getCustomerOrder);
router.post("/:id/addresses", createAddress);
router.post("/:id/orders", createOrder);

module.exports = router;
