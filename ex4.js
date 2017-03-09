var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
		if(error){
			res.writeHead(404, {"Content-Type": "text/html"});
			res.write("<p>Erreur 404.</p>");
			res.end(content);
		}
		else{
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(content);
			
		}
    });
});
    
var io = require('socket.io').listen(server);
var cpt=1;
io.sockets.on('connection', function (socket) {
	console.log('Nouvelle connexion.');
	socket.emit('connection',cpt++);
	console.log(cpt);
	socket.on('disconnect',function(){
		console.log('Deconnexion d\'un client');
		cpt--;
	});
});


server.listen(8080);
