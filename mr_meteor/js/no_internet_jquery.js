if( !window.jQuery ){
	function makeScript(){
		var jQ = document.querySelectorAll( 'script' ),
		    src,
				newSrc;
		for( var i = 0, l = jQ.length; i < l; i++ ){
		  src = jQ[i].getAttribute( 'src' );
			if( src.indexOf('/mr_m/js') !== -1 ){
				newSrc = '"' + src.substring(0, src.indexOf('/mr_m/js') + 9) + 'jquery.min.js"';
				document.write('<script src=' + newSrc + '><\/script>');
				break;
			}
	  }
	}
	makeScript();
}
//window.jQuery || document.write('<script src="jquery.min.js"><\/script>');