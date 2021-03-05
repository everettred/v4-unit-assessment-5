const auth = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    let existingUser = await db.find_user_by_username({ username });
    if (existingUser[0]) {
      return res.status(400).send("user already exists");
    }
    let salty = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(password, salty);

    const newUser = await db.create_user({ username, hash, profile_pic });
    req.session.user = newUser[0];
    res.status(201).send(req.session.user);
  },
  ////////////
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const existingUser = await db.check_user({ username });
    if (!existingUser[0]) {
      return res.status(400).send("user does not exist or is incorrect");
    }
    const authenticated = brcrypt.compareSync(password, existingUser.password);
    if (!authenticated) {
      return res.status(401).send("Password is incorrect");
    }
    req.session.user = existingUser[0];
    return res.status(200).send(req.session.user);
  },
  ///////////////
  getUser: (req, res) => {
    console.log("hit getUser");
    if (!req.session.user) {
      return res.sendStatus(404);
    } else {
      return res.status(200).send(req.session.user);
    }
  },
  ///////////////
  logout: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },
};
