UserRESTAPI
=======

A Node.js and MongoDB API used to manage user accounts

### Dependencies:

express - https://npmjs.org/package/express

mongoose - https://npmjs.org/package/mongoose

### Installation:
MongoDB Installation
http://docs.mongodb.org/manual/installation/

NodeJs Installation
http://nodejs.org/

### Examples with curl
POST   - curl -X POST --data "first_name=First&last_name=Last&email=email@address.com&password=pass" "http://localhost:3000/user"

GET    - curl "http://localhost:3000/user?_id=[id]"

DELETE - curl -X DELETE "http://localhost:3000/user?_id=[id]"
