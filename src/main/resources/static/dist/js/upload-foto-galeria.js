var Municipio = Municipio || {};

Municipio.UploadFotoGaleria = (function() {

	class UploadFotoGaleria {
		constructor() {
		}
		iniciar() {

			var bar = $('#js-progressbar-galeria').get(0);
			var fieldNomeFoto = $('input[name=imagemGaleria]');
			var upload = $('.js-upload-galeria');
			var fotosAdicionadas = new Array();
			var includeFotoGaleria = $('#foto-galeria').html();
			var template = Handlebars.compile(includeFotoGaleria);
			var containerFotoGaleria = $('.js-container-foto-galeria');
			var noticia = $('input[name=codigo]');

			UIkit.upload('.js-upload-galeria', {
				url: containerFotoGaleria.data('url-fotos-galeria'),
				allow: '*.(jpg|jpeg|png)',
				filelimit: 6,
				multiple: true,

				beforeSend: function() {
				},
				beforeAll: function() {
				},
				load: function() {
				},
				error: function() {
				},
				complete: function(request) {

					fotosAdicionadas.push(JSON.parse(request.response));


					var foto = '';
					if (JSON.parse(request.response).fotoNova == true) {
						foto = 'temp/';
					}
					foto += JSON.parse(request.response).nome;
					onRenderizarFoto(foto);

				},

				loadStart: function(e) {

					bar.removeAttribute('hidden');
					bar.max = e.total;
					bar.value = e.loaded;

				},

				progress: function(e) {

					bar.max = e.total;
					bar.value = e.loaded;

				},

				loadEnd: function(e) {

					bar.max = e.total;
					bar.value = e.loaded;

				},

				completeAll: function() {

					setTimeout(function() {
						bar.setAttribute('hidden', 'hidden');
					}, 1000);

				}
			});

			function onRenderizarFoto(nome) {
				var codigo = Math.floor(Math.random() * 1000 + 1);
				var htmlFotoGaleria = template({ foto: nome, codigo: codigo });
				fieldNomeFoto.val(JSON.stringify(fotosAdicionadas));
				containerFotoGaleria.append(htmlFotoGaleria);

				$('#btn' + codigo).on('click', function() {
					onRemoverFoto(codigo, nome);
				});

			}

			function onRemoverFoto(codigo, nome) {
				$('#' + codigo).remove();
				$.ajax({
					url: '/municipio/fotos/' + nome,
					method: 'DELETE',
					success: onExcluidoSucesso.bind(this)
				});

				fotosAdicionadas.splice(fotosAdicionadas.findIndex(x => x.nome === nome), 1);
				fieldNomeFoto.val(JSON.stringify(fotosAdicionadas));
			}

			function onExcluidoSucesso() {
				$.ajax({
					url: '/municipio/noticias/updateGaleria',
					method: 'POST',
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(
						{
							codigo: noticia.val(),
							foto: fieldNomeFoto.val()
						}
					),
					success: toastr.success('Foto excluida permanentemente!')
				});
			}



			if (fieldNomeFoto.val()) {
				var nomes = JSON.parse(fieldNomeFoto.val());
				for (var i = 0; i < nomes.length; i++) {
					nomes[i].fotoNo = false;
					fotosAdicionadas.push(nomes[i]);
					onRenderizarFoto(nomes[i].nome);
				}

			}
		}
	}

	return UploadFotoGaleria;

})();

$(function() {

	var uploadFoto = new Municipio.UploadFotoGaleria();
	uploadFoto.iniciar();

});