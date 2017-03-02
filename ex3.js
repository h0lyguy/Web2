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
			res.write("<p>Ouverture du fichier reussie</p>");
			res.end(content);
			
		}
    });
    
});


//~ var existe = fs.existsSync(server, function(exists,reponse) {
	//~ console.log("coucou2");
	//~ if (!exists) { 
		//~ reponse.writeHead(404, {'Content-Type': 'text/html'});
		//~ reponse.write("<p>Erreur 404.</p>");
		//~ reponse.end();
	//~ }
	//~ else
	//~ {
		//~ console.log("coucou3");
		//~ reponse.write("<p>La page Existe</p>");
	//~ }
//~ });


server.listen(8080);
