var http = require('http');
var server = http.createServer();
var url = require('url');
var querystring = require('querystring');

var fonctionDeCallback = function (requete, reponse) {
	reponse.writeHead(200, {"Content-Type": "text/html"});
	var res=url.parse(requete.url,true).pathname;
	var params = querystring.parse(url.parse(requete.url).query);
	switch (res)
	{
		case "/":
			reponse.write("<p>Bienvenue sur mon server node.</p>");
			break;
		
		case "/time":
			var time = new Date();
			reponse.write("<p> Date du jour : " +time.toString() + "</p>");
			break;
			
		case "/bonjour.html":
			var nom=params['prenom'];
			reponse.write("<p>Bonjour "+ nom +"</p>");
			break;
			
		default:
			reponse.writeHead(404, {'Content-Type': 'text/html'});
			reponse.write("<p>Erreur 404.</p>");
			reponse.end();
	}
	
	reponse.end();
};

server.on('request', fonctionDeCallback);
server.listen(8080);
