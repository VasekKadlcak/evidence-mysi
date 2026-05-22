const multer = require("multer");
const path = require("path");
const express = require("express");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const router = express.Router();
const mysController = require("../controllers/mysController");
const requireLogin = require("../middlewares/authMiddleware");

router.get("/", mysController.vsechnyMysi);
router.get("/pridat", requireLogin, mysController.zobrazitFormularPridani);
router.post("/", requireLogin, upload.single("image"), mysController.pridatMys);
router.get("/:id/upravit", requireLogin, mysController.zobrazitFormularUpravy);
router.put("/:id", requireLogin, upload.single("image"), mysController.upravitMys);
router.delete("/:id", requireLogin, mysController.smazatMys);
router.get("/:id", mysController.detailMysi);

module.exports = router;
