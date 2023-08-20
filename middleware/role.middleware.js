import { PERMISSIONS } from "../const.js";

const roleMiddleware = (req, res, next) => {
  const { user } = req;
  const endpoint = req.method + req.url;

  console.log("USER", user);
  console.log("ENDPOINT", endpoint);

  if (PERMISSIONS[user.role].includes(endpoint)) {
    next();
  } else {
    res.status(403).send("Not allowed!");
  }
};

export default roleMiddleware;
