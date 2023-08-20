import fs from "fs";
import { check, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import User from "../model/user.model.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

export const getUserByID = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    if (user) {
      return res.status(200).send(user);
    }

    return res.status(404).send("User not found");
  } catch (e) {
    res.status(404).send("Something went wrong when trying to find the user.");
  }
  // const usersArray = JSON.parse(users.toString());

  // const returnedUser = usersArray.users.find(
  //   (user) => user.id === req.params.id
  // );

  // delete returnedUser.password;
  // returnedUser ? res.send(returnedUser) : res.send("User not found");
};

export const createUser = (req, res) => {
  const validateUser = [check("name").isString(), check("job").isString()];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const receivedUserKeys = Object.keys(req.body);
  const expectedUserKeys = ["name", "job"];

  // Check if all expected keys are present
  const missingKeys = expectedUserKeys.filter(
    (key) => !receivedUserKeys.includes(key)
  );

  // Check if there are any unexpected keys
  const unexpectedKeys = receivedUserKeys.filter(
    (key) => !expectedUserKeys.includes(key)
  );

  if (missingKeys.length > 0 || unexpectedKeys.length > 0) {
    return res.status(400).json({
      error: "Invalid user object",
      missingKeys,
      unexpectedKeys,
    });
  }

  const sentUser = req.body;
  sentUser.id = uuidv4();

  const users = fs.readFileSync("./db.json");
  const usersArray = JSON.parse(users.toString());

  if (!usersArray.users) usersArray.users = [];

  usersArray?.users?.push(sentUser);
  try {
    fs.writeFileSync("./db.json", JSON.stringify(usersArray, null, 2));
    res.status(201).send();
  } catch (error) {
    res.status(500).send("Something went wrong :/", error);
  }
};

export const updateUser = (req, res) => {
  const users = fs.readFileSync("./db.json");
  const usersArray = JSON.parse(users.toString());
  const sentUser = req.body;

  const index = usersArray.users.findIndex((user) => user.id === req.params.id);
  usersArray.users[index] = { id: req.params.id, ...sentUser };
  try {
    fs.writeFileSync("./db.json", JSON.stringify(usersArray, null, 2));
    res.status(202).send();
  } catch (error) {
    res.status(500).send("Something went wrong :/", error);
  }
};

export const replaceUser = (req, res) => {
  const users = fs.readFileSync("./db.json");
  const usersArray = JSON.parse(users.toString());
  const sentUser = req.body;

  const index = usersArray.users.findIndex((user) => user.id === req.params.id);

  for (const [key, value] of Object.entries(sentUser)) {
    usersArray.users[index][key] = value;
  }
  try {
    fs.writeFileSync("./db.json", JSON.stringify(usersArray, null, 2));
    res.status(203).send();
  } catch (error) {
    res.status(500).send("Something went wrong :/", error);
  }
};

export const deleteUser = (req, res) => {
  const users = fs.readFileSync("./db.json");
  const usersArray = JSON.parse(users.toString());
  const sentID = req.params.id;
  const index = usersArray.users.findIndex((user) => user.id === sentID);

  usersArray.users.splice(index, 1);

  try {
    fs.writeFileSync("./db.json", JSON.stringify(usersArray, null, 2));
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Something went wrong :/", error);
  }
};
