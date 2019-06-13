module.exports.iniciaChat = function(application, req, res){
	var dadosForm = req.body;

	req.assert('apelido', 'Nome/Apelido é obrigatório!').notEmpty();
	req.assert('apelido', 'Nome/Apelido deve possuir entre 3 e 15 caracteres!').len(3, 15);

	var erros = req.validationErrors();

	if (erros) {		
		res.render('index', {validacao : erros});
		return;
	}

	application.get('io').emit(
		'msgParaClient',
		{apelido : dadosForm.apelido , mensagem : 'Acabou de entrar na conversa.' }
	);
	
	res.render('chat', { dadosForm : dadosForm });
}