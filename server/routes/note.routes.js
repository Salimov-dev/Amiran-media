const express = require("express");
const Note = require("../models/Note");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const list = await Note.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
    console.log("newNote", newNote);
    res.status(201).send(newNote);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:noteId?", auth, async (req, res) => {
  try {
    const { noteId } = req.params;
    await Note.findByIdAndRemove(noteId);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

module.exports = router;
