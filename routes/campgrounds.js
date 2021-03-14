const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const campgrounds = require("../controllers/campgrounds");

const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.route("/").get(catchAsync(campgrounds.index)).post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createNew));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id").get(catchAsync(campgrounds.showOne)).put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.update)).delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
