const HttpError = require("../models/http-error");
const { ObjectId } = require("mongoose").Types;
const List = require("../models/list-schema");

const createList = async (req, res, next) => {
  const { uid } = req.body;
  try {
    const list = new List({
      user: ObjectId(uid),
      movies: [],
    });

    await list.save();
    res.status(201).json({ list });
  } catch (error) {
    return next(error);
  }
};

const addMovie = async (req, res, next) => {
  const { movieId, uid } = req.body;
  try {
    const list = await List.findOneAndUpdate(
      { user: ObjectId(uid) },
      { $push: { movies: ObjectId(movieId) } },
      { new: true }
    );

    if (!list) throw new HttpError("El usuario no tiene lista", 400);
    res.status(201).json({ list });
  } catch (error) {
    return next(error);
  }
};

const getUserListItems = async (req, res, next) => {
  const { uid } = req.params;
  try {
    const listItems = await List.findOne({user: ObjectId(uid)}, {movies: 1}).populate("movies");
    if (!listItems) throw new HttpError("El usuario no tiene lista", 400)
    res.json(listItems)
  } catch (error) {
    return next(error);
  }
};

module.exports = { createList, addMovie, getUserListItems };
