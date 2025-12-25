const express = require("express");
const { notesController } = require("../controller/");
const { noteValidator } = require("../validator/notes");
const { validate } = require("../validator/validate");
const isAuth = require("../middleware/isAUth");

const router = express.Router();

router.post("/add", isAuth, noteValidator(), validate, notesController.addNote);
router.get("/getNote/:id", isAuth, notesController.getNote);
router.get("/getNotes", isAuth, notesController.getNotes);
router.put(
  "/updateNote/:id",
  isAuth,
  noteValidator(),
  validate,
  notesController.updateNote
);
router.delete("/deleteNote/:id", isAuth, notesController.deleteNote);

module.exports = router;
