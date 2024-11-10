require("dotenv").config();
require("module-alias/register");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL;
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./config/swagger-output.json");
const expressListEndpoints = require("express-list-endpoints");
const customerRouter = require("@/routes/customer.route");
const addressRouter = require("@/routes/address.route");
const orderRouter = require("@/routes/order.route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on ${baseUrl}:${port}`);
  const endpoints = expressListEndpoints(app);
  console.log("Available Endpoints:");
  endpoints.forEach((endpoint) => {
    console.log(`${endpoint.methods.join(", ")} ${endpoint.path}`);
  });
});

app.get("/", (req, res) => {
  return res.send("hello world");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/customers", customerRouter);
app.use("/address", addressRouter);
app.use("/order", orderRouter);
