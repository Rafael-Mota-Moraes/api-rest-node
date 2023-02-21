import User from "../models/User";
import jwt from "jsonwebtoken";

class TokenController {
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(401).json({ errors: ["Email ou senha inválidos"] });
    }

    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      return res.status(401).json({ errors: ["Usuário não existe"] });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({ errors: ["Senha inválida"] });
    }

    const id = user.id;
    const token = jwt.sign({ id: id, email: email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION
    });

    return res.json({ token: token });
  }
}

export default new TokenController();
