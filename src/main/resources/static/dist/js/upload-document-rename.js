var Municipio = Municipio || {};

Municipio.UploadDocument = (function() {

	class UploadDocument {
		constructor() {

		}
		iniciar() {

			var bar = $('#js-progressbar-document').get(0);
			var fieldNomeDoc = $('input[name=anexos]');
			var upload = $('.js-upload-document');
			var docsAdicionadas = new Array();
			var includeDocument = $('#doc-document').html();
			var template = Handlebars.compile(includeDocument);
			var containerDocument = $('.js-container-doc-document');
			UIkit.upload('.js-upload-document', {

				url: containerDocument.data('url-docs-document'),
				filelimit: 7,
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
			
					docsAdicionadas.push(JSON.parse(request.response));

					onRenderizarDoc(JSON.parse(request.response).nome, JSON.parse(request.response).contentType);
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

			function onRenderizarDoc(documento, contentType) {

				var htmlDocument = template({ doc: documento, contentType: contentType });
				fieldNomeDoc.val(JSON.stringify(docsAdicionadas));
				containerDocument.append(htmlDocument);

				$('.js-remove-doc-document').on('click', function() {
					onRemoverDoc();
				});

			}

			function onRemoverDoc() {
				$('.js-doc-document').remove();
				fieldNomeDoc.val('');
			}

			if (fieldNomeDoc.val()) {
				var nomes = JSON.parse(fieldNomeDoc.val());
				for (var i = 0; i < nomes.length; i++) {
					docsAdicionadas.push(nomes[i]);
					onRenderizarDoc(nomes[i].nome);
				}
			}
		}
	}

	return UploadDocument;

})();

$(function() {
	var uploadDoc = new Municipio.UploadDocument();
	uploadDoc.iniciar();

});