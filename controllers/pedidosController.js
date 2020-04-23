const Pedidos = require('../models/Pedidos');

/* Cargar Pedido */
exports.nuevoPedido=async(req,res,next)=>{
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje:'Pedido agregado correctamente'})
    } catch (error) {
        console.log("Error al intentar cargar un nuevo pedido",error);
        res.json({mensaje:'No se pudo cargar el pedido'})
        next();
    }
}
/* Mostrar Pedidos */
exports.mostrarPedidos=async(req,res,next)=>{
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });
        res.json(pedidos)
    } catch (error) {
        console.log("No se pudo obtener los pedidos",error);
        res.json({mensaje:'No se pudo obtener los pedidos'})
        next();
    }
}
/* Mostrar pedido especifico */
exports.mostrarPedido=async(req,res,next)=>{
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path:'pedido.producto',
        model:'Productos'
    });
    if (!pedido){res.json({mensaje:'No se encontro ese pedido'}); return next();}
    res.json(pedido)
}
/* Actualizar pedido */
exports.editarPedido=async(req,res,next)=>{
    try {
        const pedido = await Pedidos.findByIdAndUpdate({_id:req.params.idPedido},req.body,{new:true})
        res.json(pedido)
    } catch (error) {
        console.log("No se pudo actualizar el pedido",error);
        res.json({mensaje:'No se pudo actualizar el pedido'})
    }
}
exports.eliminarPedido=async(req,res,next)=>{
    try {
        const pedido = await Pedidos.findByIdAndDelete({_id:req.params.idPedido})
        res.json({mensaje:'Pedido eliminado correctamente'})
    } catch (error) {
        console.log('Se produjo un error al eliminar el pedido',error);
        res.json({mensaje:'Se produjo un error al eliminar el producto'})
    }
}