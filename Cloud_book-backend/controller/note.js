const Note = require("../models/note");

const addNote = async (req, res, next) => {
  try {
    const { title, desc, tag } = req.body;

    const note = await Note.create({
      title,
      desc,
      tag,
      user: req.user._id,
    }).then((note) => note.populate("user", "-password"));

    return res.status(201).json({
      code: 201,
      status: true,
      message: "Note added successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;

    const note = await Note.findOne({
      _id: noteId,
      user: req.user._id,
    }).populate("user", "name email");

    if (!note) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

const getNotes = async (req, res, next) => {
  try {
    const note = await Note.find({ user: req.user._id }).populate("user", "name email");

    return res.status(200).json({
      code: 200,
      status: true,
      message: "All Notes fetched successfully",
      data: { note },
    });
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const { title, desc, tag } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: noteId, user: req.user._id },
      { title, desc, tag },
      { new: true, runValidators: true }
    ).populate("user", "name email");

    if (!note) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    // Ensure user can only delete their own note
    const note = await Note.findOneAndDelete({ _id: noteId, user: req.user._id });

    if (!note) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Note deleted successfully",
      data: { note },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addNote, getNote, getNotes, updateNote, deleteNote };
