const Datastore = require('nedb');
const path = require('path');
htmldb= new Datastore({filename:path.join(__dirname, 'data/dbs/html.db'), autoload: true})
var link1={id: "sans", link0: "https://jcw87.github.io/c2-sans-fight/"}
var link2={id: "dino", link0: "https://chromedino.com/"}
htmldb.insert(link1, function (err, newDoc) {});
htmldb.insert(link2, function (err, newDoc) {});