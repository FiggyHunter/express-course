import fs from "fs";
import bcrypt, { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { ROLES, SECRET } from "../const.js";
import User from "../model/user.model.js";

const SALT_ROUNDS = 10;

export const registerUser = async (req, res) => {
  const { password, ...sentUser } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const userToSave = new User({
      ...sentUser,
      password: hashedPassword,
      role: ROLES.USER,
    });

    await userToSave.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send("Could not register user!");
  }
  // const users = fs.readFileSync("./db.json");
  // const usersArray = JSON.parse(users.toString());
  // for (const user of usersArray.users) {
  //   if (user.job === sentUser.job && user.name === sentUser.name) {
  //     return res.status(407).send("User already exists!");
  //   }
  // }
  // try {
  //   const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  //   const userToSave = {
  //     ...sentUser,
  //     password: hashedPassword,
  //     id: uuidv4(),
  //     role: ROLES.USER,
  //   };
  //   sentUser.password = hashedPassword;
  //   sentUser.id = uuidv4();

  //   usersArray.users.push(userToSave);

  //   fs.writeFileSync("./db.json", JSON.stringify(usersArray, null, 2));
  //   res.status(201).send(`Saved user ${JSON.stringify(userToSave)}`);
  // } catch (error) {
  //   res.status(500).send("Something went wrong :/");
  // }
};

export const loginUsers = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    console.log(user);
    const match = await bcrypt.compare(password, user.password);
    console.log(user.password);
    if (match) {
      const token = jwt.sign(
        {
          data: { id: user.id, role: user.role },
        },
        SECRET,
        { expiresIn: 60 * 60 }
      );
      return res.status(200).send(token);
    }

    return res.status(401).send("login failed");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
  // const users = fs.readFileSync("./db.json", "utf-8");
  // const usersArray = JSON.parse(users.toString());

  // const user = usersArray.users.find((user) => user.name === name);

  // console.log("USER PASSWORD", user.password);

  // const match = await bcrypt.compare(password, user.password);

  // if (match) {
  //   const token = jwt.sign(
  //     {
  //       data: { id: user.id, role: user.role },
  //     },
  //     SECRET,
  //     { expiresIn: 60 * 60 }
  //   );
  //   res.status(200).send(token);
  // } else {
  //   res.status(401).send("Login Failed");
  // }
};

export const validateToken = (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET);
    res.status(200).send();
  } catch (error) {
    res.status(401).send("Invalid");
  }
};
