import Aluno from "../models/Aluno";

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json(aluno);
    } catch (error) {
      return res.status(400).json(error.errors.map((error) => error.message));
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ errors: ["Aluno não existe"] });
      }

      if (!id) {
        return res
          .status(400)
          .json({ errors: ["Id não existe ou está faltando"] });
      }

      return res.json(aluno);
    } catch (error) {
      return res.status(400).json(error.errors.map((error) => error.message));
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ errors: ["Aluno não existe"] });
      }

      if (!id) {
        return res
          .status(400)
          .json({ errors: ["Id não existe ou está faltando"] });
      }

      const alunoDeletado = await aluno.destroy();
      return res.json({ ...alunoDeletado, apagado: true });
    } catch (error) {
      return res.status(400).json(error.errors.map((error) => error.message));
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ errors: ["Aluno não existe"] });
      }

      if (!id) {
        return res
          .status(400)
          .json({ errors: ["Id não existe ou está faltando"] });
      }

      const alunoAtualizado = aluno.update(req.body);

      return res.json(aluno);
    } catch (error) {
      return res.status(400).json(error.errors.map((error) => error.message));
    }
  }
}

export default new AlunoController();
