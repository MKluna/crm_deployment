const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuarioController = require('../controllers/usuariosController');

/* Proteccion de rutas */
const auth = require('../middleware/auth');

module.exports=function () { 
    /* =============CLIENTES============= */
    //Agregar nuevos clientes via POST
    router.post('/clientes',auth,clienteController.nuevoCliente)
    //Obtener todos los clientes via GET
    router.get('/clientes',auth,clienteController.mostrarClientes)
    //Obtener cliente especifico
    router.get('/clientes/:idClientes',auth,clienteController.mostrarCliente)
    //Editar el cliente
    router.put('/clientes/:idClientes',auth,clienteController.actualizarCliente)
    //Eliminar el cliente
    router.delete('/clientes/:idClientes',auth,clienteController.eliminarCliente)
    /* =============PROUCTOS============= */
    /* Subir producto */
    router.post('/productos',auth,productosController.subirArchivo,productosController.nuevoProducto)
    /* Obtener todos los productos */
    router.get('/productos',auth,productosController.mostrarProductos)
    /* Obtener los productos por ID */
    router.get('/productos/:idProducto',auth,productosController.mostrarProducto);
    /* Editar producto */
    router.put('/productos/:idProducto',auth,productosController.subirArchivo,productosController.editarProducto)
    /* Eliminar un producto */
    router.delete('/productos/:idProducto',auth,productosController.eliminarProducto)
    /* Busqueda de productos */
    router.post('/productos/busqueda/:query',productosController.buscarProducto)
    /* =============PEDIDOS============= */
    /* Cargar Pedido */
    router.post('/pedidos/nuevo/:idUsuario',auth,pedidosController.nuevoPedido)
    /* Obtener Todos los pedidos */
    router.get('/pedidos',auth,pedidosController.mostrarPedidos)
    /* Obtener pedido por ID del cliente */
    router.get('/pedidos/:idPedido',auth,pedidosController.mostrarPedido)
    /* Actualizar un pedido */
    router.put('/pedidos/:idPedido',auth,pedidosController.editarPedido)
    /* Eliminar un pedido */
    router.delete('/pedidos/:idPedido',auth,pedidosController.eliminarPedido)
    /* Usuario */
    router.post('/crear-cuenta',usuarioController.registrarUsuario);
    router.post('/iniciar-sesion',
    usuarioController.autenticarUsuario
    )
    return router;
 }