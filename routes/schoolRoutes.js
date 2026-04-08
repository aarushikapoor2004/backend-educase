const express = require("express");
const router = express.Router();
const { addSchool, listSchools } = require("../controllers/school");
const { validateSchoolInput } = require("../middleware/middleware");

router.post("/addSchool", validateSchoolInput, addSchool);
router.get("/listSchools", listSchools);

module.exports = router;