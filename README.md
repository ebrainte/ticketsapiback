
# PiruTickets Backend

This is the backend API of pirutickets, feel free to use it or improve it.

## Usage examples


### Get distances between 2 addresses (using gmaps api)

POST
```
/apiTickets/getDistances

Body:
{
	"originAddr": "Avenida Corrientes 750, Buenos Aires, Argentina",
	"destAddr": "Avenida Corrientes 2500, Buenos Aires, Argentina"
}
```

### Get all events

GET
```
/apiTickets/getEvents
```

### Get events by id
POST
```
/apiTickets/getEventsbyId

Body:
{
    "id": "5db5af918e8d1157500c1f1c"
}
```


### Get events by name (not necessarily the full name)
POST
```
/apiTickets/getEventsbyName

Body:
{
    "eventName": "man"
}
```

### Get events by name AND Address (not necessarily the full name)
POST
```
/apiTickets/getEventsbyName

Body:
{
    "eventName": "man",
    "address": "Avenida Corrientes 1500, Buenos Aires, Argentina"
}
```

### Get event name (for autocompletion)
POST
```
/apiTickets/getEventsAutocomplete

Body:
{
    "eventName": "man"
}
```

### Get events by type (not necessarily the full name)
POST
```
/apiTickets/getEventsbyType

Body:
{
    "eventType": "musi"
}
```

### Get events by location (not necessarily the full name)
GET
```
/apiTickets/getEventsbyLocation

Body:
{
    "eventLocation": "gran"
}
```

### Buy a Ticket

POST
```
/apiTickets/buy

Body:
{
    "withCC": true,
    "creditCardNumber": "4545454545454545",
    "expiryDate": "11/25",
    "payments": 3,
    "fullName": "Esteban Quito",
    "email": "esteban@quito.com",
    "eventName": "Mana",
    "eventPricing": 2500,
    "eventDate": "11/12/2019"
}
```

### Insert a new event

POST
```
/apiTickets/insertEvent

Body:
{
    "eventName": "Mana",
    "eventDate": "2019-11-28",
    "eventType": "Musica",
    "eventLocation": "Teatro Gran Rex",
    "eventAddress": "Avenida Corrientes 1528, Buenos Aires, Argentina",
    "eventDescription": "Concierto de Mana",
    "eventPricing": 2630,
    "imageUrl": "https://i2.wp.com/contextodiario.com/wp-content/uploads/2018/09/mana-.jpg?w=800&ssl=1",
    "starAverage": 4.5
}
```

### Update event name

POST
```
/apiTickets/updateEventName

Body:
{
    "_id": "XXXXXX",
    "eventName": "Mana2"
}

```