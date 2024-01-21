import { Router } from "express";
import User from "../models/users.js";

const router = new Router();

// GET: returns all users
router.get("/", async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

//GET: Gets USERS BY ID
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ msg: "ID Not Found" });
  else res.json(user);
});

//======= Getting users by their username ===
// this didn't work

router.get("/:username", async (req, res) => {
  const user = await User.findOne(req.params.username);

  if (!user) return res.status(404).json({ msg: "User Not Found!" });
  else res.json(user);
});

//=========================

//==== POST METHOD ROUTE=========
//POST: Creates New Users
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
});

//Jan 19, 2024
//PUT: ==== Updates a user
router.put("/:id", async (req, res) => {
  const { id } = req.params; //
  const { body } = req;
  const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

  res.json(updatedUser);
});

//DELETE:
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({ msg: "User was deleted", deleteUser });
  } catch (error) {
    console.log(error);
  }
});

export default router;
