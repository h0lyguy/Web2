var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    fs.readFile('./chat.html', 'utf-8', function(error, content) {
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

io.sockets.on('connection', function (socket) {
	
	
	console.log('Nouvelle connexion.');
	/**
	 * Réception de l'événement 'message' et réemission
	 */  
	socket.on('nouveau_client', function(pseudo) {
		socket.pseudo = pseudo;
		socket.broadcast.emit('nouveau_client', pseudo);
    });
    
    /**
     * Envoi du message sur tout les clients 
     */
    socket.on('message_chat',function(message){
		io.emit('message_chat', {pseudo: socket.pseudo,message});
	 });
		 
});

server.listen(8080);
