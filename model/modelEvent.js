var mongoose = require('mongoose').set('debug', true);

var Schema = mongoose.Schema;


var eventSchema = new Schema({
    eventName: String,
    eventDate: Date,
    eventType: String,
    eventLocation: String,
    eventAddress: String,
    eventDescription: String,
    eventPricing: Number,
    imageUrl: String,
    starAverage: Number
});
var Events = mongoose.model('Event', eventSchema);

console.log("se creo modelo de los eventos");
module.exports = Events;
