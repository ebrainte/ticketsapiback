
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
### Get dishes by name (not necessarily the full name)
GET
```
/apiTickets/getEventsbyName

Body:
{
    "eventName": "man"
}
```

### Get dish name (for autocompletion)
GET
```
/apiTickets/getEventsAutocomplete

Body:
{
    "eventName": "man"
}
```

### Get dishes by type (not necessarily the full name)
GET
```
/apiTickets/getEventsbyType

Body:
{
    "eventType": "musi"
}
```

### Get dishes by location (not necessarily the full name)
GET
```
/apiTickets/getEventsbyLocation

Body:
{
    "eventLocation": "gran"
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