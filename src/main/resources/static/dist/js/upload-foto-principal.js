var Municipio = Municipio || {};

Municipio.UploadFotoPrincipal = (function() {

	class UploadFotoPrincipal {
		constructor() {
		}
		iniciar() {

			var bar = $('#js-progressbar').get(0);
			var fieldNomeFoto = $('input[name=imagemPrincipal]');
			var upload = $('.js-upload');
			var includeFotoPrincipal = $('#foto-principal').html();
			var template = Handlebars.compile(includeFotoPrincipal);
			var containerFotoPrincipal = $('.js-container-foto-principal');

			UIkit.upload('.js-upload', {
				url: containerFotoPrincipal.data('url-foto-principal'),
				allow: '*.(jpg|jpeg|png)',
				filelimit: 1,
				multiple: false,

				beforeSend: function() {
				},
				beforeAll: function() {
				},
				load: function() {
				},
				error: function() {
				},
				complete: function(request) {
					fieldNomeFoto.val(JSON.parse(request.response).nome);
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
				var htmlFotoPrincipal = template({ foto: nome });
				upload.hide();
				containerFotoPrincipal.append(htmlFotoPrincipal);

				$('.js-remove-foto-principal').on('click', function() {
					onRemoverFoto();
				});

			}

			function onRemoverFoto() {

				$('.js-foto-principal').remove();
				upload.show();
				fieldNomeFoto.val('');

			}

			if (fieldNomeFoto.val()) {

				onRenderizarFoto(fieldNomeFoto.val());

			}
		}
	}

	return UploadFotoPrincipal;

})();

$(function() {

	var uploadFoto = new Municipio.UploadFotoPrincipal();
	uploadFoto.iniciar();

});