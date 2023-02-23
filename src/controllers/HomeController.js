import Aluno from "../models/Aluno";

class HomeController {
  async index(req, res) {
    res.status(401).json({ ok: true });
  }
}

export default new HomeController();
