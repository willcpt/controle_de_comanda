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
			var chamamento = $('input[name=codigo]');

			UIkit.upload('.js-upload-document', {

				url: containerDocument.data('url-docs-document'),
				allow: '*.(pdf|doc|docx|txt)',
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
				var codigo = Math.floor(Math.random() * 1000 + 1);
				var htmlDocument = template({ doc: documento, contentType: contentType, codigo: codigo });
				fieldNomeDoc.val(JSON.stringify(docsAdicionadas));
				containerDocument.append(htmlDocument);



				$('#btn' + codigo).on('click', function() {
					onRemoverDocumento(codigo, documento);
				});

			}

			function onRemoverDocumento(codigo, documento) {
				$('#' + codigo).remove();
				$.ajax({
					url: '/municipio/documentos/' + documento,
					method: 'DELETE',
					success: onExcluidoSucesso.bind(this)
				});

				docsAdicionadas.splice(docsAdicionadas.findIndex(x => x.nome === documento), 1);
				fieldNomeDoc.val(JSON.stringify(docsAdicionadas));
			}

			function onExcluidoSucesso() {
				$.ajax({
					url: '/municipio/chamamentos/updateDocumento',
					method: 'POST',
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(
						{
							codigo: chamamento.val(),
							documento: fieldNomeDoc.val()
						}
					),
					success: toastr.success('Documento excluido permanentemente!')
				});
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