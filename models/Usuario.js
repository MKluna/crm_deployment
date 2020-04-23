const mongose = require('mongoose');
const Schema = mongose.Schema;

const usuarioSchema = new Schema({
    email:{type:String,unique:true,lowercase:true,trim:true},
    nombre:{type:String,required:'Agrega tu nombre'},
    password:{type:String,required:true}
});

module.exports = mongose.model('Usuarios',usuarioSchema);