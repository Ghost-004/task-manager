const jwt= require('jsonwebtoken');


const authenticateToken = async (req, res, next) => {
       const authheader = req.headers['authorization'];
       const token = authheader && authheader.split(' ')[1];
       if (!token) {
              return res.status(401).json({ message: "Access token is missing" });
       }

       jwt.verify(token, "kartikTM", (err, user) => {
              if (err) {
                     return res.status(403).json(err);
              }
              req.user = user;
              next();
       });
};
module.exports = authenticateToken;