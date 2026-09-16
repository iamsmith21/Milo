import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) return res.status(401).json({ error: "No access" });

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(404).json({ error: "Access denied" });

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "invalid token" });
  }
};
