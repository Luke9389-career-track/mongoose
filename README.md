Lab 06: Mongoose ORM
===

1. Using `mongoose`, build a tested model 
1. Create express routes for CRUD against your model

## Schema

Design a schema of your choosing. You will be using this entity through the week, so make it something fun that you enjoy.

Requirements:

At least one:

1. `String`, `Number`, and `Boolean` property.
1. complex Array property
1. complex Object property
1. `default` option
1. `enum` option
1. min or max on string or number

## Testing

### Arrangement

1. Create an instance of your model
1. Call `.validateSync`
    - For expected success
        1. return value should be `null`
        1. test `.toJSON` to see what is captured
    - For failures
        1. return value is errors object
        1. test expected errors
        1. arrays don't return all errors

Nested properties will use compound key like `name.first`

### What to Test

1. Full example of valid model (should return same data plus `_id`)
1. Required fields (pass an empty object)
1. Defaults
1. Min or max ranges

## Express Server

Create an express server with the following routes and associated model methods:

method | route | model method
---|---|---
`GET` | `/api/things` | Model.find
`GET` | `/api/things/:id` | Model.findById
`POST` | `/api/things` | Model.create
`PUT` | `/api/things/:id` | Model.findByIdAndUpdate
`DELETE` | `/api/things/:id` | Model.findByIdAndRemove

Open Postman and manually test your routes, checking in Compass (or `mongo` cli) that data is being saved as expected.

**Include one screenshot image of postman per route**