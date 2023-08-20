import fs from "fs";
import bcrypt, { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const SALT_ROUNDS = 10;

export const registerUser = async (req, res) => {
  const { password, ...sentUser } = req.body;
  const users = fs.readFileSync("./db.json");
  const usersArray = JSON.parse(users.toString());
  for (const user of usersArray.users) {
    if (user.job === sentUser.job && user.name === sentUser.name) {
      return res.status(407).send("User already exists!");
    }
  }
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const userToSave = {
      ...sentUser,
      passowrd: hashedPassword,
      id: uuidv4(),
    };
    sentUser.password = hashedPassword;
    sentUser.id = uuidv4();

    usersArray.users.push(userToSave);

    fs.writeFileSync("./db.json", JSON.stringify(usersArray, null, 2));
    res.status(201).send(`Saved user ${JSON.stringify(userToSave)}`);
  } catch (error) {
    res.status(500).send("Something went wrong :/");
  }
};
