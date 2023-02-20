import Aluno from "../models/Aluno";

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: "Rafael",
      sobrenome: "Moreira",
      email: "rafael@email.com",
      idade: 18,
      peso: 70,
      altura: 1.64
    });
    res.status(401).json({ novoAluno });
  }
}

export default new HomeController();
