import jwt from "jsonwebtoken";

export default (req, res, next) => {

  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ msg: "Auth Error!!" });
  }

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded; //jwt payload
    req.user.auth = true;
    next();
  } catch (error) {
    res.json({token_error: error.message, auth: false});
  }
};