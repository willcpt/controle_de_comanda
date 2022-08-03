var Municipio = Municipio || {}

Municipio.EditorTexto = (function(){
	
	function EditorTexto(){
		this.btnSubmit = $('.js-btn-submit');
		this.fieldArtigo = $('input[name=procedimento]');
		this.fieldArtigoHtml = $('input[name=procedimentoHtml]');
		this.theme = 'snow';
		this.editorArtigo = '.procedimento';
		this.optionsFullTollbar = [
	        [{ 'font': [] }, { 'size': [] }],
	        [ 'bold', 'italic', 'underline', 'strike' ],
	        [{ 'color': [] }, { 'background': [] }],
	        [{ 'script': 'super' }, { 'script': 'sub' }],
	        [{ 'header': ['1','2','3','4','5','6'] }, 'blockquote', 'code-block' ],
	        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
	        [ {'direction': 'rtl'}, { 'align': [] }],
	        [ 'link', 'image', 'video', 'formula' ],
	        [ 'clean' ]
	      ];
		
		this.optionsTollbar = [
	        [{ 'font': [] }, { 'size': [] }],
	        [ 'bold', 'italic', 'underline', 'strike' ],
	        [{ 'color': [] }, { 'background': [] }],
	        [{ 'script': 'super' }, { 'script': 'sub' }],
	        [{ 'header': '1' }, { 'header': '2' }, 'blockquote'],
	        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
	        [ {'direction': 'rtl'}, { 'align': [] }],
	        [ 'link'],
	        [ 'clean' ]
	      ];
	}
	
	EditorTexto.prototype.enable = function(){
		var fullEditor2 = new Quill(this.editorArtigo, {
		    bounds: this.editorArtigo,
		    modules: {
		      syntax: true,
		      toolbar: this.optionsFullTollbar,
		    },
		    theme: this.theme
		  });
			
		if(this.fieldArtigo.val()){
			fullEditor2.setContents(JSON.parse(this.fieldArtigo.val()), 'api');
		}
		
		this.btnSubmit.on('click', putText.bind(this, fullEditor2));
	}
	
	function putText(text2){
		
		this.fieldArtigo.val(JSON.stringify(text2.getContents()));
		
		this.fieldArtigoHtml.val(text2.container.firstChild.innerHTML);
		
	}
	
	return EditorTexto;
}());

$(function(){
	var editorTexto = new Municipio.EditorTexto();
	editorTexto.enable();
	
});