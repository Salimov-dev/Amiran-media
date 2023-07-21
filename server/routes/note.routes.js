const express = require("express");
const Note = require("../models/Note");
const router = express.Router({ mergeParams: true });
// const auth = require('../middleware/auth.middleware')

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

router.post("/create", async (req, res) => {
  try {
    const newNote = await Note.create({
     ...req.body,
    //  ...req.body,
      // userId: req.user._id,
      // category: "67rdca3eeb7f6fgeed471814",
    });
    console.log("newNote", newNote);
    res.status(201).send(newNote);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
