var Events = require('../model/modelEvent');
var bodyParser = require('body-parser');
var request = require("request")
const rp = require('request-promise')
var NodeGeocoder = require('node-geocoder');
const nodemailer = require("nodemailer");

var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

let getEvents = (req, res) => {
    console.log("Listado de Eventos");
    //Listar resultados

    Events.find(function (err, listaEventos) {
        //devuelvo resultado query   
        //console.log(listaContactos); 
        res.status(200).send(listaEventos);
        //si hay error
        (err) => {
            res.status(500).send(err);
            console.log(err);
        }
    });

};


let getEventsbyName = async (req, res) => {
    console.log("lectura de eventos por nombre");
    //Obtener id busqueda
    let name = { eventName: { $regex: '.*' + req.body.eventName + '.*', $options: 'i' } };
    console.log("ahora viene la variable");
    console.log(name);
    //Listar resultados

    Events.find(name, (err, text) => {
        if (err) {
            console.log(err);
            return res.status(500).send(text);
        }
        else {
            //console.log(text);
            console.log(req.body.address);
            if (req.body.address) {
                console.log("entro una direccion");
                console.log(req.body.address);
                getDistance(req.body.address, text).then(function (data) { //element.restaurantAddress, text).then(function(data){
                    //console.log("ACA VIENE LA MAGIA" +  data);
                    return (data);
                }).then(function (content) {
                    console.log("ACA VIENE EL CONTENT:" + content);
                    return res.status(200).send(content);

                })

            } else {
                return res.status(200).send(text);
            }


        }
    })
};



async function getDistance(firstAddr, text) {




    let promiseArray = text.map((value) => {
        // console.log(value);
        return rp({
            uri: "https://maps.googleapis.com/maps/api/directions/json?origin=" + firstAddr + "&destination=" + value.eventAddress + "&key=AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4",
            json: true
        })
            .then(function (data) {
                var obj = data.routes[0].legs[0].distance.text;
                console.log(obj);
                asd = value;
                asd.distance = obj;
                console.log("Distancia: " + asd);
                return (asd);
            })

    });
    // console.log(promiseArray);
    // resolve(promiseArray);

    return Promise.all(promiseArray);


}




const getEventsbyId = async (req, res) => {
    console.log("lectura de eventos por id");
    //Obtener id busqueda
    let name = { _id: req.body.id };
    console.log("ahora viene la variable");
    console.log(req.body.id);
    //Listar resultados

    await Events.find(name, (err, text) => {
        if (err) {
            console.log(err);
            return res.status(500).send(text);
        }
        else {
            geocode(text).then(function (data) {
                console.log("ACA VIENE LA MAGIA" + data);
                res.status(200).send(data);
            })
            // console.log(text);
            // console.log(text[0].geo);
            // return res.status(200).send(text);
        }
    })
};


async function geocode(text) {

    // console.log(text[0].eventAddress);
    return geocoder.geocode(text[0].eventAddress)
        .then(function (res) {
            text[0].geo[0] = res[0].latitude;
            text[0].geo[1] = res[0].longitude;
            console.log(text);
            return (text);
        })
        .catch(function (err) {
            console.log(err);
        });

}

let getEventsAutocomplete = (req, res) => {
    console.log("autocomplete");
    //Obtener id busqueda
    let name = { eventName: { $regex: '.*' + req.body.eventName + '.*', $options: 'i' } };
    console.log("ahora viene la variable");
    console.log(name);
    //Listar resultados

    Events.findOne(name, { eventName: true }, (err, text) => {
        if (err) {
            console.log(err);
            return res.status(500).send(text);
        }
        else {
            console.log(text);
            return res.status(200).send(text);
        }
    })
};

let getDistanceBetweenAddresses = (req, res) => {
    console.log("distancia entre direcciones");
    //Obtener id busqueda
    let originAddr = req.body.originAddr;
    let destAddr = req.body.destAddr;
    console.log(originAddr);
    console.log(destAddr);
    var url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + originAddr + "&destination=" + destAddr + "&key=AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4"
    console.log(url);
    // var url = "https://maps.googleapis.com/maps/api/directions/json?origin=41.43206,-81.38992&destination=42.43206,-81.38992&key=AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4"
    let options = { json: true };


    rp({
        uri: "https://maps.googleapis.com/maps/api/directions/json?origin=" + originAddr + "&destination=" + destAddr + "&key=AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4",
        json: true
    })
        .then((data) => {
            obj = data.routes[0].legs[0].distance.text;
            res.status(200).send(obj)
        })
        .catch((err) => {
            console.log(err)
        })
};

let insertEvent = (req, res) => {
    console.log(req.body);

    var newEvent = Events({
        eventName: req.body.eventName,
        eventDate: req.body.eventDate,
        eventType: req.body.eventType,
        eventLocation: req.body.eventLocation,
        eventAddress: req.body.eventAddress,
        eventDescription: req.body.eventDescription,
        eventPricing: req.body.eventPricing,
        imageUrl: req.body.imageUrl,
        starAverage: req.body.starAverage
    });
    newEvent.save().
        then
        (
            (newEvent) => {
                res.status(200).send(newEvent); //devuelvo resultado query       
            },
            (err) => {
                res.status(500).send(err);
                console.log(err);
            }
        )
}


let buy = (req, res) => {
    console.log(req.body);
    var message;
    var data = {
        withCC: req.body.withCC,
        creditCardNumber: req.body.creditCardNumber,
        expiryDate: req.body.expiryDate,
        payments: req.body.payments,
        fullName: req.body.fullName,
        email: req.body.email,
        eventName: req.body.eventName,
        eventPricing: req.body.eventPricing,
        eventDate: req.body.eventDate
    };


    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1f1b2ab16594e3",
          pass: "d720545c481b7f"
        }
      });
    
      if(data.withCC == true){
      message = {
        from: 'noreply@pirutickets.com',
        to: data.email,
        subject: 'Gracias por su Compra!',
        text: 'Estos son los detalles de su compra:\nNombre del evento: ' + data.eventName + '\nPrecio: ' + data.eventPricing + '\nFecha: ' +  data.eventDate + '\nDatos de la TC: ' + data.creditCardNumber 
        };
    }
    else{
        message = {
            from: 'noreply@pirutickets.com',
            to: data.email,
            subject: 'Gracias por su Reserva!',
            text: 'Estos son los detalles de su reserva:\nNombre del evento: ' + data.eventName + '\nPrecio: ' + data.eventPricing + '\nFecha: ' +  data.eventDate + '\nUsted debera abonar en las siguientes 48hs o la reserva sera cancelada'
            };
    }
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
          res.status(200).send(info);
          
        }
    });

}


let getEventsbyType = (req, res) => {
    console.log("lectura de eventos por tipo");
    //Obtener id busqueda
    let name = { eventType: { $regex: '.*' + req.body.eventType + '.*', $options: 'i' } };
    console.log("ahora viene la variable");
    console.log(name);
    //Listar resultados

    Events.find(name, (err, text) => {
        if (err) {
            console.log(err);
            return res.status(500).send(text);
        }
        else {
            console.log(text);
            return res.status(200).send(text);
        }
    })
};

let getEventsbyLocation = (req, res) => {
    console.log("lectura de eventos por ubicacion");
    //Obtener id busqueda
    let name = { eventLocation: { $regex: '.*' + req.body.eventLocation + '.*', $options: 'i' } };
    console.log("ahora viene la variable");
    console.log(name);
    //Listar resultados

    Events.find(name, (err, text) => {
        if (err) {
            console.log(err);
            return res.status(500).send(text);
        }
        else {
            console.log(text);
            return res.status(200).send(text);
        }
    })
};


let updateEventName = (req, res) => {
    let id = { id: req.body.id };

    console.log("update", id);
    // console.log(newContacto);
    Events.findOneAndUpdate({ _id: req.body.id }, { $set: { eventName: req.body.restaurantName } }, { new: true }, function (err) {
        //console.log("respuesta",res);
        //let rta = {estado: "Ok"};
        res.status(200).send({ estado: "Registro modificado" }); //devuelvo resultado query       
        (err) => {
            res.status(500).send(err);
            console.log(err);
        }

    });
}

let deleteContacto = (req, res) => {
    let id = { dni: req.body.dniEliminado };
    Contactos.deleteOne(id, function (err) {
        res.status(200).send({ estado: "Registro eliminado" }); //devuelvo resultado  
        (err) => {
            res.status(500).send(err);
            console.log(err);
        }
    });


}
module.exports = { getEvents, getEventsbyName, getEventsbyId, getEventsAutocomplete, buy, insertEvent, getEventsbyType, getEventsbyLocation, updateEventName, deleteContacto, getDistanceBetweenAddresses };

