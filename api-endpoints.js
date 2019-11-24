// Initialize express router
let router = require('express').Router();
let apiController = require('./controllers/apiControllers');
       

router.get('/', function (req, res) 
{
    res.json(
    {
       status: 'Rest',
       message: 'RESTful API for pirutickets',
    });
});


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

router.post('/getEventsbyName', async function(req,res)
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

router.post('/getDistances',function(req,res)
{
    console.log("calcular distancias entre 2 direcciones");
    apiController.getDistanceBetweenAddresses(req,res);
});


router.post('/buy',function(req,res)
{
    console.log(req.body);
    apiController.buy(req,res);
});

router.post('/insertEvent',function(req,res)
{
    console.log(req.body);
    apiController.insertEvent(req,res);
});

router.post('/updateEventName',function(req,res)
{
    apiController.updateEventName(req,res);
});

// Export API routes
module.exports = router;
