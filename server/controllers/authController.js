import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import bcrypt from "bcrypt";

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) return res.status(404).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name: name, email: email, password: hashedPassword },
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({ token: token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to sign up" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) return res.status(401).json({ error: "no such user found" });

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid)
      return res.status(401).json({ error: "incorrect email or password" });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({ token: token, user: user });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

export { SignUp, Login };
