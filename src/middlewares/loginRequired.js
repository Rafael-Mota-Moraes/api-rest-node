import jwt from "jsonwebtoken";
import User from "../models/User";

export default async function (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ["Login required"] });
  }

  const [texto, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({
      where: {
        id: id,
        email: email
      }
    });

    if (!user) {
      return res.status(401).json({ errors: ["Usuário inválido"] });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({ errors: ["Token expirado ou inválido"] });
  }
}
