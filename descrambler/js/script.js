// Note: this script supports internet explorer 9 and above

var SCRAMBLER,
		F;

SCRAMBLER = {

	funcs: {
		addLineBreaksToScrambledMessage: function( scrambledMessage, lineLength ) {
			var lineCount;

			scrambledMessage = scrambledMessage.split( '<span>' );
			lineLength = ( lineLength !== undefined ? lineLength : 100 );
			lineCount = Math.ceil( scrambledMessage.length / lineLength );

			for ( var i = 1; i < lineCount; i++ ) {
				scrambledMessage[ i * lineLength ] = scrambledMessage[ i * lineLength ] + '<br />';
			}

			return scrambledMessage.join( '<span>' );
		},

		bindElems: function() {
			document.getElementById( 'descrambleMessage' ).addEventListener( 'click', function() {
				if ( !document.querySelectorAll( '#results span[ hidden ]' ).length ) {
					return;
				}

				document.getElementById( 'results' ).innerHTML = F.getDescrambledMessage();
			});

			document.getElementById( 'scrambleMessage' ).addEventListener( 'click', function() {
				var $textarea = document.querySelectorAll( 'textarea' )[ 0 ];
						textToScramble = $textarea.value;

				if ( !textToScramble.length ) {
					$textarea.className = 'invalid';
					return;
				}

				$textarea.value = '';
				document.getElementById( 'results' ).innerHTML = F.getScrambledMessage( textToScramble );
			});

			document.querySelectorAll( 'textarea' )[ 0 ].addEventListener( 'click', function() {
				if ( this.className === 'invalid' ) {
					this.className = '';
				}
			});
		},

		createRandomFiller: function( fillerLength, fillerChars ) {
			var filler = '';

			fillerLength = ( fillerLength !== undefined ? fillerLength : 30 );
			fillerChars = ( fillerChars !== undefined ? fillerChars : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*&!)^(:?{}#' );

			for ( var i = 0; i < fillerLength; i++ ) {
    		filler += '<span>' + fillerChars.charAt( Math.floor( Math.random() * fillerChars.length ) ) + '</span>';
			}
			
			return filler;
		},

		getDescrambledMessage: function() {
			var $hiddenSpans = document.querySelectorAll( '#results span[ hidden ]' ),
					descrambledMessage = '';

			for ( var i = 0; i < $hiddenSpans.length; i++ ) {
				descrambledMessage += $hiddenSpans[ i ].textContent;
			}

			return descrambledMessage;
		},

		getIntInRange: function( min, max ) {
			min = ( min !== undefined ? min : 15 );
			max = ( max !== undefined ? max : 40 );

			return Math.floor( Math.random() * ( max - min + 1 ) + min );
		},

		getScrambledMessage: function( str ) {
			var scrambledMessage = '';

			str.split( '' ).forEach( function( char ) {
				scrambledMessage += '<span hidden>' + char + '</span>' + F.createRandomFiller( F.getIntInRange() );
			});
			
			return F.addLineBreaksToScrambledMessage( scrambledMessage );
		}
	},
	
	init: function() {
		F = this.funcs;
		F.bindElems();
	}
}

SCRAMBLER.init();
