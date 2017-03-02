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
	console.log("Nombre de connexions : "+cpt++);
    console.log('Nouvelle connexion.');
});
server.listen(8080);
