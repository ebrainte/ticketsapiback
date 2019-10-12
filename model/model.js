var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    nombre:String,
    fecha: Date,
    latitud: String,
    longitud: String,
    precio: Number,
    disponibilidad: Number,
    fotourl: String,
    descripcion: String,
    descuento: Number
});

var Tickets = mongoose.model('Ticket', ticketSchema);
console.log("se creo modelo");
module.exports = Tickets;
