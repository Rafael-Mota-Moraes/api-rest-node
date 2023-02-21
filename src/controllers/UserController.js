import User from "../models/User";

class HomeController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json({ novoUser });
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();

      return res.json(users);
    } catch (error) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);

      return res.json(user);
    } catch (error) {
      return res.status(400).json(null);
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não enviado"]
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({
          errors: ["Usuário não existe"]
        });
      }

      const novosDados = await user.update(req.body);

      return res.json(novosDados);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não enviado"]
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({
          errors: ["Usuário não existe"]
        });
      }

      const usuarioApagado = await user.destroy();
      return res.json(usuarioApagado);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }
}

export default new HomeController();
