const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const request = require('request');
const Datastore = require('nedb');
const fs = require('fs');

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
app.get('/list', (req,res) => {
	var dir = req.query.dir;
	console.log(dir);
	fs.readdir(path.join(__dirname,dir), (err,files) => {
		console.log(files);
		console.log(err);
		if (err) {
			res.send(err);
		} else {
			res.send(files);
		}
	})
})
app.get("*", (req,res) => {
	res.sendFile(path.join(__dirname,"data","html", "/error.html"))
})
const server = app.listen(process.env.PORT || 8080, () =>{
	console.log("Running")
	console.log(server.address());
})