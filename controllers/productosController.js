const Productos = require("../models/Productos");
const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No válido"));
    }
  },
};
// pasar la configuración y el campo
const upload = multer(configuracionMulter).single("imagen");
//Sube un archivo
exports.subirArchivo = (req,res,next)=>{
    upload(req,res,function (error) { 
        if (error) {
            res.json({mensaje:error})
        }
        return next();
     })
}



/* ========================================= */


/* Agregar Productos */
exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);
  try {
      if (req.file.filename) 
      {
          producto.imagen=req.file.filename
      }
    await producto.save();
    res.json({ mensaje: "Producto agregado correctamente" });
  } catch (error) {
    console.log("No se pudo agregar el producto ", error);
    next();
  }
},
/* Mostrar Productos */
exports.mostrarProductos=async(req,res,next)=>{
  try {
    const producto = await Productos.find({})
    res.json(producto)
  } catch (error) {
    console.log("Se produjo un error al encontrar los productos ",error);
    res.json({mensaje:'No se pudo obtener los productos'})
    next();
  }
},
exports.mostrarProducto = async (req, res, next) => {
  const producto = await Productos.findById(req.params.idProducto);
  if(!producto) {
      res.json({mensaje : 'Ese Producto no existe'});
      return next();
  }
  // Mostrar el producto
  res.json(producto);
},
/* Editar producto */
exports.editarProducto=async(req,res,next)=>{
  try {
    /* Actualizar la imagen */
    let productoAnterior = await Productos.findById(req.params.idProducto);
    /* Construir nuevo producto */
    let nuevoProducto = req.body;
    /* Verificar si existe una imagen previa */
    if(req.file){nuevoProducto.imagen=req.file.filename}else{
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    let producto = await Productos.findOneAndUpdate({_id:req.params.idProducto},nuevoProducto,{new:true})
    res.json(producto)
  } catch (error) 
  {
    console.log("Se produjo un error al editar el producto");
    res.json({mensaje:'No se pudo editar el producto'})  
    next();
  }
},
/* Borrar Producto */
exports.eliminarProducto=async(req,res,next)=>{
  try {
    const producto = await Productos.findByIdAndDelete({_id:req.params.idProducto})
    res.json({mensaje:'Producto eliminado con exito'})
  } catch (error) {
    console.log("No se pudo borrar el producto ",error);
    res.json({mensaje:'No se pudo eliminar el producto'})
    next();
  }
}
/* Buscar Producto */
exports.buscarProducto=async(req,res,next)=>{
  try {
    const {query} = req.params
    const producto = await Productos.find({nombre:new RegExp(query,'i')});
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
}


