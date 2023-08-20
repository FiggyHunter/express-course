import jwt from "jsonwebtoken";

const SECRET = "DGT44";

const authMiddleware = (req, res, next) => {
  const token = req.header("x-access-token");
  try {
    const result = jwt.verify(token, SECRET);
    console.log(result);
    req.user = result.data;
    next();
  } catch (error) {
    res.status(403).send("forbidden");
  }
};

export default authMiddleware;
