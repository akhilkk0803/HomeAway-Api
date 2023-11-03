const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.get("Authorization");
    if(!token){
      const error = new Error("Not authenticated");
      error.status= 401;
      throw error;
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, "heavySecret");
    } catch (err) {
      err.status = 500;
      throw err;
    }
    if (!decodedToken) {
      const error = new Error("Could not authenticate");
      error.status = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
};
