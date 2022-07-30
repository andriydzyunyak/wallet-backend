const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");

const router = express.Router();

router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
