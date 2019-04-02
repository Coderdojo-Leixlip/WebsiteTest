const Datastore = require('nedb');
const path = require('path');
htmldb= new Datastore({filename:path.join(__dirname, 'data/dbs/users.db'), autoload: true})
var link1={id: "John", link0: "user1"}
var link2={id: "Dave", link0: "user2"}
htmldb.insert(link1, function (err, newDoc) {});
htmldb.insert(link2, function (err, newDoc) {});