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
					onRenderizarFoto(JSON.stringify(fotosAdicionadas));

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
				var nomes = JSON.parse(nome);
				for(var i = 0; i < nomes.length; i++){
				var htmlFotoGaleria = template({ foto: nomes[i].nome });
				containerFotoGaleria.append(htmlFotoGaleria);
			}
				
					
				
				
				
				fieldNomeFoto.val(JSON.stringify(fotosAdicionadas));
				

				$('.js-remove-foto-galeria').on('click', function() {
					onRemoverFoto();
				});

			}

			function onRemoverFoto() {

				$('.js-foto-galeria').remove();
				fieldNomeFoto.val('');
			}

			if (fieldNomeFoto.val()) {
				onRenderizarFoto(fieldNomeFoto.val());
			}
		}
	}

	return UploadFotoGaleria;

})();

$(function() {

	var uploadFoto = new Municipio.UploadFotoGaleria();
	uploadFoto.iniciar();

});
