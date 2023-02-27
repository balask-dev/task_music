const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("./userModel.js");


router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: hashed,
    });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const user = await newUser.save();
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Invalid credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Invalid credentials!");

    const { password, ...others } = user._doc;
    res.send(others);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;

 