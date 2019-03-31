const Datastore = require('nedb');
const path = require('path');
htmldb= new Datastore({filename:path.join(__dirname, 'data/dbs/scratch.db'), autoload: true})
var link1={name: "Shoot The Balls", id: "172416456"}
var link2={id: "65515784", name: "Haunted House of ?"}
htmldb.insert(link1, function (err, newDoc) {});
htmldb.insert(link2, function (err, newDoc) {});