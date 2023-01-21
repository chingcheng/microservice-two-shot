# Wardrobify

Team:

* Ching Cheng - Hats
* Cierra Reese - Shoes

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice

The Hat model tracks each hat's fabric, style name, color, picture url, and location to the the specific closet where it is located. The LocationVO model and the poller works together to poll Location objects from the Location model from the Wardrobe microservice. Once the Hat microservice is able to connect with the Wardrobe microservice, then it will be possible to create a hat and specify which location each hat belongs to.

## Hats RESTful APIs
GET - gets a list of all the hats - http://localhost:8090/api/hats/
GET - gets the details of one hat - http://localhost:8090/api/hats/<int:pk>/
POST - create a new hat with the posted data - http://localhost:8090/api/hats/
DELETE - deletes a single hat - http://localhost:8090/api/hats/<int:pk>/
