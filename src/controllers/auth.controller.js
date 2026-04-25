const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../data/store");

const JWT_SECRET = "supersecret";

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  res.status(201).json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
};
