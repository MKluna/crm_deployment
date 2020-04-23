const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registrarUsuario = async (req, res) => {
  const usuario = new Usuario(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    await usuario.save();
    res.json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error" });
  }
};

exports.autenticarUsuario = async (req, res, next) => {
  const usuario = await Usuario.findOne({ email: req.body.email });
  if (!usuario) {
    await res.status(401).json({ mensaje: "Usuario Inexistente" });
    next()
  } else {
    if (!bcrypt.compareSync(req.body.password, usuario.password)) {
      await res.status(401).json({ mensaje: "Password Incorrecto" });
      next();
    }
    else{
        const token = jwt.sign({
            email:usuario.email,
            nombre:usuario.nombre,
            id:usuario._id
        },'LLAVESECRETA',{expiresIn:'1h'});
        res.json({token})
    }
  }
};
