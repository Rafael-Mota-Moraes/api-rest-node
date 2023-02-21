import User from "../models/User";

class HomeController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      res.json({ novoUser });
    } catch (err) {
      res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }
}

export default new HomeController();
