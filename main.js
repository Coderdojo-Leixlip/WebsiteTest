const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const request = require('request');
const Datastore = require('nedb');

const PORT = 8080;
const app = express();
htmldb= new Datastore({filename:path.join(__dirname, 'data/dbs/html.db'), autoload: true})
scratchdb= new Datastore({filename:path.join(__dirname, 'data/dbs/scratch.db'), autoload: true})
userdb= new Datastore({filename:path.join(__dirname, 'data/dbs/users.db'), autoload: true})

app.use(express.static(path.join(__dirname, 'data')))

nunjucks.configure(path.join('data', 'html'), {
	autoescape: true,
	express: app
});
app.get('/', (req,res) => {
	htmldb.find({}, function(err,docs) {
		var html = docs;
		scratchdb.find({}, (err,docs) =>{
			var scratch = docs;
			userdb.find({}, (err,docs) => {
				var users=docs
				res.render("home.html", {html: html, scratch: scratch, users: users});
			})
	});
	});
	
});
app.get('/scratch', (req,res) => {
	let id = req.query.id;
	res.render("scratchgame.html", {'id': id})
})
app.get('/html', (req,res) => {
	htmldb.find({id: req.query.id}, (err,docs) => {
		res.render("htmlgame.html", {link0: docs[0].link0})
	})
	
})
const server = app.listen(PORT, () =>{
	console.log("Running")
	console.log(server.address());
})