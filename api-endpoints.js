// Initialize express router
let router = require('express').Router();
let apiController = require('./controllers/apiControllers');
       


// Set default API response
router.get('/', function (req, res) 
{
    res.json(
    {
       status: 'Rest',
       message: 'RESTful API for pirutickets',
    });
});

//EndPoint para leer toda la base
router.get('/getEvents',function(req,res)
{
    console.log("leer");
    apiController.getEvents(req,res);
});

router.post('/getEventsbyId',async function(req,res)
{
    console.log("leer");
    await apiController.getEventsbyId(req,res);
});

router.post('/getEventsbyName',function(req,res)
{
    console.log("leer");
    apiController.getEventsbyName(req,res);
});

router.get('/getEventsAutoComplete',function(req,res)
{
    console.log("autocomplete");
    apiController.getEventsAutocomplete(req,res);
});

router.post('/getEventsbyType',function(req,res)
{
    console.log("leer");
    apiController.getEventsbyType(req,res);
});

router.get('/getEventsbyLocation',function(req,res)
{
    console.log("leer");
    apiController.getEventsbyLocation(req,res);
});

//EndPoint para leer con filtro
router.post('/getDistances',function(req,res)
{
    console.log("calcular distancias entre 2 direcciones");
    apiController.getDistanceBetweenAddresses(req,res);
});

//EndPoint para insertar en la BD
router.post('/insertEvent',function(req,res)
{
    console.log(req.body);
    apiController.insertEvent(req,res);
});

//EndPoint para modificar en la BD
router.post('/updateEventName',function(req,res)
{
    apiController.updateEventName(req,res);
});

// Export API routes
module.exports = router;
