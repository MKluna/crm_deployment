const Clientes = require('../models/Clientes');
//Agregar Nuevo Cliente
exports.nuevoCliente=async(req,res,next)=>{
    const cliente = new Clientes(req.body);
    try {
        //Almacenar un registro
        await cliente.save();
        res.json({mensaje:'Se agrego un nuevo cliente correctamente'})
    } catch (error) {
        //si hay un error , console.log y next
        res.send(error);
        next();
    }
},
/* Muestra los clientes */
exports.mostrarClientes=async(req,res,next)=>{

    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {console.log("Se causo un error al mostrar los clientes",error);next();}
    
},
/* Mostrar cliente por ID */
exports.mostrarCliente = async(req,res,next)=>{
    const cliente= await Clientes.findById(req.params.idClientes);
    if (!cliente)
    {
        res.json({mensaje:'Cliente no encontrado'});
        next()  
    }
    //Mostrar Cliente
    res.json(cliente);
},
/* Editar cliente */
exports.actualizarCliente=async(req,res,next)=>{
    try {
        const cliente = await  Clientes.findOneAndUpdate({_id:req.params.idClientes},req.body,{
            new:true
        })
        res.json(cliente);
    } catch (error) {
        res.send(error);
        next()
    }
},
/* eliminar Cliente */
exports.eliminarCliente=async(req,res,next)=>{
    try {
        const cliente = await Clientes.findByIdAndRemove({_id:req.params.idClientes})
        if (!cliente) 
        {
            res.json({mensaje:'El cliente que intenta eliminar no existe'})    
        }
        res.json({mensaje:'Cliente Eliminado'})
    } catch (error) 
    {
        console.log("No se pudo eliminar el cliente",error);
        next();    
    }
}

