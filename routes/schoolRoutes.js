const express = require("express");
const router = express.Router();
const { addSchool, listSchools } = require("../controllers/school");
const { validateSchoolInput } = require("../middleware/validate");

router.post("/addSchool", validateSchoolInput, addSchool);
router.get("/listSchools", listSchools);

module.exports = router;