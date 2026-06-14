const multer = require("multer");
const express = require("express");
const router = express.Router();
const mysController = require("../controllers/mysController");
const requireLogin = require("../middlewares/authMiddleware");
const requireAdmin = require("../middlewares/adminMiddleware");

const upload = multer({ dest: "temp/" }); // dočasná složka

router.get("/", mysController.vsechnyMysi);
router.get("/pridat", requireLogin, mysController.zobrazitFormularPridani);
router.post("/", requireLogin, upload.single("image"), mysController.pridatMys);
router.get("/:id/upravit", requireLogin, mysController.zobrazitFormularUpravy);
router.put("/:id", requireLogin, upload.single("image"), mysController.upravitMys);
router.delete("/:id", requireLogin, mysController.smazatMys);
router.get("/:id", mysController.detailMysi);

module.exports = router;