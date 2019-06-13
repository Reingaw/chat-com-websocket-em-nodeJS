//Importar configurações do servidor
var app = require('./config/server');

//Parametros da porta de escuta do servidor
var server = app.listen(80, function(){
	console.log('Servidor rodando em localhost:80');
});

//Carregando o modúlo do Socket.io
var io = require('socket.io').listen(server);

app.set('io', io);

//Criar conexão por websocket
io.on('connection', function(socket){
	console.log('Conectado');

	socket.on('disconnect', function(socket){
		console.log('Desconectado');
	});

	//dialogo
	socket.on('msgParaServidor', function(data){
		socket.emit(
			'msgParaClient',
			{ apelido : data.apelido, mensagem : data.mensagem }
		 );

		socket.broadcast.emit(
			'msgParaClient',
			{ apelido : data.apelido, mensagem : data.mensagem }
		);

		//participantes
		if (parseInt(data.participantes_count) == 0) {
			socket.emit(
				'participantesParaClient',
				{ apelido : data.apelido }
			 );

			socket.broadcast.emit(
				'participantesParaClient',
				{ apelido : data.apelido }
			);
		}
	});
});