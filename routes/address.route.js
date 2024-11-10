const {
  getAllAddresses,
  updateAddress,
  deleteAddress,
} = require("@/controllers/address.controller");
const express = require("express");
const router = express.Router();

router.get("/", getAllAddresses);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

module.exports = router;
