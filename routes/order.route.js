const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("@/controllers/order.controller");

router.get("/", getAllOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
