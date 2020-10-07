const router = require("express").Router();
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // exitUser
  const exitEmail = await User.findOne({ email: req.body.email });
  if (exitEmail) {
    return res.status(400).send("Email Already Exit");
  }

  //password hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  //   createUser
  const userRegister = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  try {
    const saveUser = await userRegister.save();
    res.json(saveUser);
  } catch (error) {
    res.json({ message: error });
  }
});

// User Login
router.post("/login", async (req, res) => {
  // Checking User Email in Database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email is wrong");
  }

  // Valid Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    res.status(400).send("Invalid Password");
  } else {
    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.Token_Secret);
    res.header("auth-token", token).send({ token: token });
  }
});

module.exports = router;
