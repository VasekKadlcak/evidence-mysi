const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/authMiddleware");
const zadostController = require("../controllers/zadostController");

router.post("/:mysId", zadostController.vytvorZadost);
router.get("/", requireLogin, zadostController.vsechnyZadosti);
router.post("/:id/schvalit", requireLogin, zadostController.schvalitZadost);
router.post("/:id/zamitout", requireLogin, zadostController.zamitnoutZadost);

module.exports = router;
