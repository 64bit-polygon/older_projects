$( document ).ready( function() {

	/*
	
	
	a block of utility functions. some will be used in mobile,
	some non-mobile, some both.
	
	a block of on initial load for non-mobile. these run once, when the
	site is entered.
	
	a block for when each page is fully loaded. these are for mobile &
	non-mobile and run once.
	
	a block of functions to be run whenever the page runs for non-mobile
	
	a block of no-mobile
	
	
	*/

/* COMMON: global vars */   
/////////////////////////////////////////////////////////////////////////////////////////    








/*
	
	








glitch in tablet size splash to animation:
the info nav animates from mid way to the top of the page

no scroll when loading from comics subdomain - solution:
	http://stackoverflow.com/questions/10756893/how-to-ignore-popstate-initial-load-working-with-pjax
it's calling the popstate on refresh.
if you refresh the splash you'll see a similar error.
	









*/







var $html = $( 'html' ),
	$body = $( 'body' ),
	$win = $( window ),
	un = undefined,
	CONTACT = {
		email: false,
		input_imgs: un,
		inputs: un,
		message: false,
		send_btn: un,
		subject: false
	},
	PAGE = {
		animation_ran: un,
		can_horz_scroll: un,
		comics_ran: un,
		contact_ran: un, 
		cur_page: un,
		h: $win.height(),
		has_animations : $html.hasClass( 'cssanimations' ),
		has_touch: $html.hasClass( 'touch' ),
		has_transforms: $html.hasClass( 'csstransforms' ),
		has_transitions: $html.hasClass( 'csstransitions' ),
		is_animating: false,
		is_mobile: $html.hasClass( 'mobile' ),
		is_site_loaded: false,
		is_transitioning: false,
		load_meter: $( '.load_meter_bar' ),
		load_pop_up: $( '.load_meter_pop_up' ),
		load_widget: $( '.load_meter_widget' ),
		Loaded: [],
		med_max_w: un,
		med_min_w: un,
		not_splash_ran: un,
		sections: '',
		shadows: $( '.frame_shadow' ),
		splash_ran: un,
		w: $win.width()
	},
	COMICS = {
		articles: un,
		cur_height: un,
		figures: un,
		height_elem: un,
		scrolled_elem: un,
		scroll_expand: $( '#scroll_expand' ),
		scroll_ghost: $( '#scroll_ghost' ),
		section: un,
		tracks: un,
		tabs: un
	},
	SPLASH = {
		enter: un,
		enter_count: -2,
		enter_glow: un,
		enter_wrap: un,
		letter_count: 0,
		letters: [],
		logo: un,
		logo_animate: false,
		logo_dir : -1,
		logo_l: un,
		logo_speed: un
	},
	ART = {
		tabs: un
	},
	ANIMATION = {
		articles: un,
		figures: un,
		margin: un,
		max_h: un,
		max_vp_w: un,
		max_w: un,
		players: un,
		vp_w: un,
		width: un,
		tabs: un
	},
	NAV = {
		Archive: [ 'comics', 'art', 'animation' ],
		cur_index: un,
		down_arrow: un,
		from_archive: un,
		from_splash: un,
		is_narrow: un,
		left_arrow: un,
		left_arrow_clone: un,
		menu_elems: $( '.about_wrap, .contact_wrap, .category_nav, #menu_backing' ),
		menu_hide: true,
		menu_show: false,
		next_index: un,
		percent_width: un,
		pieces: un,
		pixel_width: un,
		prev_index: un,
		replaced_gif_src: un,
		right_arrow: un,
		right_arrow_clone: un,
		sub_nav: un,
		tabs: un,
		to_archive: un,
		to_splash: un,
		up_arrow: un,
		win_max: un,
		is_animating: false
	},
	BTNS = {
		add_sub: {
			'+': function ( x, y ) { 
				return x + y
			},
			'-': function ( x, y ) {
				return x - y 
			}
		},
		elem: un,
		ghost_btns: un,
		ob_name: un
	};
	
//$html.removeClass( 'no-mobile' ).addClass( 'mobile' );

// dd
function abnormal_w_limits( $elems, max, w ) {
	/**
	* description
	*
	* @called : make_comic_style_tag
	*
	* @group : 
	* @page : comics
	*
	* @params {jquery object} - $elems :
	*					{int} - max :
	*/
	
	// w isn't used here
	
	var $elem,
			i = 0,
			$img,
			id,
			l = $elems.length,
	    style = '';
	
	for ( i; i < l; i++ ) {
		$elem = $elems.eq( i );
		
		if ( $elem.width() > max ) {
			id = '#' + $elem.attr( 'id' );
			$img = $elem.children();
			
			style += 'ol > ' + id + '{margin-left:0 !important; margin-right:0 !important; height: auto !important;}';
			
			style += id + ' > #' + $img.attr( 'id' ) + '{position: static;}';
		}
	}

	return style;
}

function adjust_scroll() {
	/**
	* description
	*
	* @called : check_nav_btn_limits
	* @calls : check_scroll_height
	*
	* @group : 
	* @page : comics
	*/
	
	//called from check_nav_btn_limits();
	COMICS.scrolled_elem
		.css( 'top', 'auto' );
	
	COMICS.scroll_ghost
		.scrollTop( 0 );
		
	COMICS.height_elem = COMICS.articles.eq( NAV.next_index );
	COMICS.scrolled_elem = COMICS.articles.eq( NAV.next_index );
	COMICS.cur_height = COMICS.height_elem.height();
	
	COMICS.scroll_expand
		.height( COMICS.cur_height );
		
	check_scroll_height();
}

// dd
function animate_contact_checkmarks( $elem, str, op, declass, addclass ){
	/**
	* description
	*
	* @called : contact_input_events
	*
	* @group : email
	* @page : contant
	*
	* @params {jquery ob} - $elem :
	*					{str} - str:
	*					{float} - op:
	*					{str} - declass:
	*					{str} - addclass:
	*/
	
	$elem.html( str )
		.velocity(
			{ 'opacity': op }, 700, function() {
				$( this )
					.removeClass( declass )
					.addClass( addclass );
      }
	);
}

function animate_meters( l ) {
	/**
	* description
	*
	* @called : load_site
	* @calls : animate_meter (child)
	*
	* @group : load site
	* @page : splash
	*/
	var cnt = PAGE.load_meter.attr( 'data-cnt' );
	
	cnt = ( cnt === undefined ? 0 : cnt );
	cnt = parseInt( cnt, 10 ) + 1;
	
	// per = Math.floor( parseFloat( ( 1 / PAGE.sections.length * 100 ).toFixed( 2 ) ) * 100 );
	
	// inc = per;
	
	PAGE.load_meter
		.attr( 'data-cnt', cnt )
		.css( 'width', cnt / 100 + '%' );
		
	if ( cnt === l ) {
		PAGE.site_is_loaded = true;
		transition_out_meter();
	}
	
	function animate_meter() {
		/**
		* description
		*
		* @called : animate_meters (parent)
		* @calls : transition_out_meter,
		*					 animate_meter (self)
		*
		* @group : load site
		* @page : splash
		*/
		
		if ( $.inArray( animation_count, PAGE.Loaded ) === -1 ) {
			window.setTimeout( animate_meter, 100 );
		} else {
			PAGE.load_meter
				.css( 'width', per / 100 + '%' );
				
			if ( ( Math.ceil( per / 100 ) === 100 ) || ( Math.round( per / 100 ) === 100 ) ) {
				PAGE.site_is_loaded = true;
				transition_out_meter();
				
				return;
			}
			
			per += inc;
			animation_count++;
			
			animate_meter();
			
			/*
			PAGE.load_meter
				.velocity(
					{ width: per / 100 + '%' },
				  { duration: 600,
						complete: function() {
							if ( ( Math.ceil( per / 100 ) === 100 ) || ( Math.round( per / 100 ) === 100 ) ) {
								PAGE.site_is_loaded = true;
								transition_out_meter();
								
								return;
							}
							
							per += inc;
							animation_count++;
							
							animate_meter();
						}
					}
			);
			*/
		}
	}
	
	//animate_meter();
}

function can_scroll() {
	/**
	* description
	*
	* @called : desktop_functions
	*
	* @group : 
	* @page : animation,
	*					art
	*/
	
	if ( PAGE.w < PAGE.med_min_w ) {
		if ( !PAGE.can_horz_scroll ) {
			PAGE.can_horz_scroll = true;
		}
	} else {
		if ( PAGE.can_horz_scroll ) {
			PAGE.can_horz_scroll = false;
		}
	}
}

function check_scroll_height() {
	/**
	* description
	*
	* @called : desktop_functions,
	*						adjust_scroll
	*
	* @group : 
	* @page : comics
	*/
	
	if ( COMICS.cur_height !== COMICS.height_elem.height() ) {
		COMICS.cur_height = COMICS.height_elem.height();
	}
	
	if ( COMICS.scroll_expand.height() !== COMICS.cur_height ) {
		COMICS.scroll_expand
			.height( COMICS.cur_height );
	}
}

function contact_input_events() {
	/**
	* description
	*
	* @called : run_not_splash -> run_contact
	* @calls : validate_email,
	*					 animate_contact_checkmarks
	*
	* @group : 
	* @page : contact
	*/
	
	var Blur_Or_Focus = [],
	    Defaults = [],
			feedback_val,
			fields,
			fields_compare,
			i = 0,
			l = l = CONTACT.inputs.length,
      $mark, 
	    $progress,
			$this,
			val;
			
			 
	for ( i; i < l; i++ ) {
		Defaults[i] = CONTACT.inputs
										.eq( i )
			              .data( 'initial_val' );
	}
	
	CONTACT.inputs.on( 'focus blur', function( e ) {
		$this = $( this );
		i = CONTACT.inputs.index( $this );
		val = $this.val().trim();
		
		Blur_Or_Focus = ( e.type === 'focus' ? [ Defaults[ i ], '' ] : [ '',Defaults[ i ] ] );
		
		if ( val.length == Blur_Or_Focus[ 0 ].length ) {
			$this.val( Blur_Or_Focus[ 1 ] );
		}
		
		if ( e.type === 'focus' ) {
			return;
		}
		
		fields = ( CONTACT.email && CONTACT.subject && CONTACT.message );
		
		$mark = CONTACT.marks.eq( i );
		$progress = CONTACT.progresses.eq( i );
		
		if ( $this.attr( 'id' ) === ( 'from_input_ghost' ) ) {
			feedback_val = validate_email( val );
			
			CONTACT.email = feedback_val;
		} else {
			feedback_val = ( val != '' );
			
			if ( $this.attr( 'id' ) === 'subject_input_ghost' ) {
				CONTACT.subject = feedback_val;
			} else {
				CONTACT.message = feedback_val;
			}
		}
		
		if ( feedback_val && ( $mark.html() === 'incomplete' ) ) {
			animate_contact_checkmarks( $mark, 'complete', 1, 'var_false', 'var_true' );
			animate_contact_checkmarks( $progress, 'has been', 0.5, 'progress_false', 'progress_true' );
		} else if ( !feedback_val && ( $mark.html() === 'complete' ) ) {
			animate_contact_checkmarks( $mark, 'incomplete', 0, 'var_true', 'var_false' );
			animate_contact_checkmarks( $progress, 'needs to be', 0, 'progress_true', 'progress_false' );
		}
		
		fields_compare = ( CONTACT.email && CONTACT.subject && CONTACT.message );
		
		//go down
		if ( (fields !== fields_compare) && fields_compare ) {
			CONTACT.send_btn.removeClass( 'clicked' );
		}
		
		//go down
		if ( ( fields !== fields_compare ) && !fields_compare ) {
			CONTACT.send_btn.addClass( 'clicked' );
		}
	});
}

//runs each time for desktop
function desktop_functions() {
	/**
	* description
	*
	* @called : onload event
	* @calls : get_cur_page,
	*					 get_animation_speed,
	*					 splash_resize,
	*					 position_splash_loading_bar,
	*					 logo_up_and_down,
	*					 btn_objects,
	*					 find_current_index,
	*					 vids_vert_responsive,
	*					 can_scroll,
	*					 check_scroll_height,
	*					 on_scroll
	*
	* @group : 
	* @page : 
	*/
	
	/*set up enviroment here*/
	
	//gets current page
	get_cur_page();
	
	PAGE.can_horz_scroll = false;
	
	//cancels unneeded re-size calls
	$win
		.off( 'resize' )
		.on( 'resize', function() {
			PAGE.w = $win.width();
			PAGE.h = $win.height();
		}
	);

	COMICS.scroll_ghost.css( 'visibility', 'hidden' );
	
	if ( PAGE.cur_page === 'splash' ) {
		SPLASH.logo_animate = true;
		SPLASH.dots_animate = true;

		SPLASH.logo_l = Math.ceil( SPLASH.logo.height() / 5 );
		SPLASH.logo_speed = get_animation_speed( SPLASH.logo_l, 0.0073 );
      
		$win.on( 'resize', function() {
			splash_resize();
			position_splash_loading_bar();
		});
		
		logo_up_and_down();
		position_splash_loading_bar();
	} else {
		BTNS.ghost_btns = $( '.ghost' ).not( '.to_enter' );
		
		SPLASH.logo_animate = false;
		SPLASH.dots_animate = false;
		
		if ( !PAGE.is_site_loaded ) {
			//load_site();
		}
	}
	
	
	if ( PAGE.cur_page === 'animation' ) {
		vids_vert_responsive();
		
		$win.on( 'resize', function() {
			vids_vert_responsive();
			can_scroll();
		});
	}
	
	if ( PAGE.cur_page === 'comics' ) {
    COMICS.height_elem = COMICS.articles.eq( 0 );
    COMICS.scrolled_elem = COMICS.height_elem;
		COMICS.cur_height = COMICS.height_elem.height();
		
		$win.on( 'resize', function() {
			check_scroll_height();
		});
		
		COMICS.scroll_ghost
			.off( 'scroll', on_scroll )
			.on( 'scroll', on_scroll )
			.css( 'visibility', 'visible' );
							
		check_scroll_height();
	}
	
	if ( PAGE.cur_page === 'art' ) {
		$win.on( 'resize', can_scroll );
	}
	
	if ( PAGE.cur_page === 'contact' ) {
		// ?
	}
}

//runs once on load for desktop
function desktop_once() {
	/**
	* description
	*
	* @called : onload ev
	* @calls : set_media_query_widths,
	*					 make_ajax_boxes,
	*					 get_cur_page,
	*					 dots_fade,
	*					 load_site
	*
	* @group : 
	* @page : 
	*/
	
	var $elem,
			i = 0,
			l = NAV.Archive.length;
	
	
	set_media_query_widths();
	
	make_ajax_boxes();
	
	get_cur_page();
	
	

	
	if ( PAGE.cur_page !== 'splash' ) {
		PAGE.load_widget
			.delay( 500 )
			.velocity(
				{ 'opacity': 1,
					'top': "-=15px" },
				{ duration: 500,
					complete: function() {
						dots_fade();
						load_site();
					}
				}
		);
	}
	
}

function dots_fade() {
	/**
	* description
	*
	* @called : pages_once -> run_splash,
	*						desktop_once
	*
	* @group : 
	* @page : splash
	*/
	
	var add_class;
	
	if ( !PAGE.has_animations ) {
		return;
	}
	
	add_class = ( PAGE.cur_page === 'splash' ? 'dot_bounce' : 'dot_shake' );

	window.setTimeout(
		function() {
			$( '#dot_1' ).addClass( add_class );
		}, 150
	);
	
	window.setTimeout(
		function() {
			$( '#dot_2' ).addClass( add_class );
		}, 300
	);
	
	window.setTimeout(
		function() {
			$( '#dot_3' ).addClass( add_class );
		}, 450
	);
}

function enter_hover( e ) {
	/**
	* description
	*
	* @called : pages_once -> run_splash
	*
	* @group : 
	* @page : splash
	*
	* @params {event ob} - e :
	*/
	
	SPLASH.enter_glow
		.clearQueue()
		.stop()
		.velocity(
			{ scale: ( e.type === 'mouseenter' ? 1 : 0.7 ),
				opacity: ( e.type === 'mouseenter' ? 1 : 0 ) }
	);
} 

function find_current_index( $pieces ) {
	/**
	* description
	*
	* @called : desktop_functions
	*
	* @group : 
	* @page : 
	*
	* @params {jquery object} - $pieces : 
	*/
	
	var cur_index,
			i = 0,
			l = $pieces.length;
	
	for ( i; i < l; i++ ) {
		if ( !parseInt( $pieces.eq( i ).css( 'left' ) ) ) {
			cur_index = i;
		}
	}
	
	return cur_index;
}

function get_animation_speed( width, per_mil ) {
	/**
	* description
	*
	* @called : letters_and_logo_transition,
	*						logo_off_screen,
	*						mobile,
	*						pages_once -> run_not_splash,
	*						desktop_functions,
	*						splash_resize
	*
	* @group : utility
	* @page : all
	*
	* @params {int} - width : 
	*					{int} - per_mil :
	*/
	
	return Math.round( parseFloat( width )/per_mil );
}

function get_cur_page() {
	/**
	* description
	*
	* @called : mobile,
	*						desktop_functions,
	*						desktop_once
	*
	* @group : utility
	* @page : all
	*/
	
	if ( PAGE.is_mobile) {
		if ( $body.hasClass( 'page' ) && $body.hasClass( 'splash' ) ) {
			PAGE.cur_page = 'splash';
	  } else {
	  	PAGE.cur_page = $( '#mobile_nav li' ).filter( '.clicked' ).find( '.ghost' ).attr( 'data-to' );
	  }
	} else {
		PAGE.cur_page = $( 'section' ).not( $( '.hidden' ) ).attr( 'id' );
		
	  if ( !PAGE.cur_page ) {
			PAGE.cur_page = '404';
	  }
	}
}

function get_important_styles( $elem, Style_Arr ) {
	/**
	* description
	*
	* @called : make_comic_style_tag
	* @calls : return_em
	*
	* @group : 
	* @page : comics
	*
	* @params {jquery object} - $elem : 
	*					{array} - Style_Arr :
	*/
	
	var compare_str,
			el_style = $elem.attr( 'style' ),
			i = 0,
			Style,
			style_str,
			Styles;

	if ( !el_style ) {
		return '';
	}

	Styles = el_style.split( ';' );
	Style = [];
	style_str = '#' + $elem.attr( 'id' ) + '{';
	compare_str = style_str;
	
	l = Styles.length;
	
	for ( i; i < l; i++ ) {
		Style = Styles[ i ].split( ':' );

		for ( var j = 0, c = Style_Arr.length; j < c; j++ ) {
			if( Style_Arr[ j ] === Style[ 0 ] ) {
				style_str += ( Style[ 0 ] + ':' + return_em( Style[ 1 ] ) +' !important;' );
			}
		}	
	}

	if ( style_str === compare_str ) {
		return '';
	} else {
		return style_str += '}';
	}
}

function get_medium_screen_limits() {
	/**
	* description
	*
	* @called : set_media_query_widths
	*
	* @group : 
	* @page : 
	*/
	
	PAGE.med_max_w = parseInt(
		$( '#medium_query' )
			.attr( 'media' )
		 	.substring(
				( $( '#medium_query' )
						.attr( 'media' )
						.lastIndexOf( ':' ) ) + 1
	), 10 );
	 
	PAGE.med_min_w = parseInt(
		$( '#medium_query' )
			.attr( 'media' )
			.substring(
				( $( '#medium_query' )
						.attr( 'media' )
						.indexOf( ':' ) ) + 1
	), 10 );
	
	
	if ( PAGE.is_mobile ) {
		$( '#medium_query' ).remove();
	}
}

function letters_and_logo_transition() {
	/**
	* description
	*
	* @called : letters_and_logo_transition (self),
	*						pages_once -> run_splash,
	*						transition_out_meter
	* @calls : letters_and_logo_transition (self),
	*					 get_animation_speed
	*
	* @group : 
	* @page : splash
	*/
	
	$( SPLASH.letters[ SPLASH.letter_count ] )
		.velocity(
			{ opacity: 0 },
			{ duration: Math.random() * 2000 }
	);
	
	SPLASH.letter_count++;
	 
	if ( SPLASH.letter_count !== SPLASH.letters.length ) {
		letters_and_logo_transition();
	} else {
		SPLASH.letter_count = 0;
		
		if ( !PAGE.has_animations ) {
			SPLASH.logo_animate = false;
		} else {	
			var l = Math.ceil( SPLASH.logo.offset().top + SPLASH.logo.height() ) + 20;
			
			SPLASH.logo
				.velocity(
					{ top: '-=' + l + 'px' },
				  { duration: get_animation_speed( l, 0.4 ),
						complete: function() {
							console.log( 'done' )
							// transition_pages( 'splash', 'animation' );
							load_site();
							// transition_from_splash();
							
							// 
						}
					}
				);
      }
   }
}

function load_site() {
	/**
	* description
	*
	* @called : pages_once -> run_splash,
	*						desktop_functions,
	*						desktop_once
	* @calls : animate_meters
	*
	* @group : 
	* @page : splash,
	*					animation
	*
	* @params {str} - page : 
	*/
	
	var cur_section_loading,
			i = 0,
			id,
	    l = PAGE.sections.length,
			load_count = 0;
			console.log( l );
			//return;
	
	if ( PAGE.is_site_loaded ) {
		//trans to animation
	}

	for ( i; i < l; i++ ) {
		id = PAGE.sections.eq( i ).attr( 'id' );
		cur_section_loading = AJAX_OB.AJAX_META[ id ].uri + ' [role="main"]';
		
		$( '#' + id )
			.load( cur_section_loading, function( response, status, xhr ) {
				if ( status === 'success' ) {
	        PAGE.Loaded[ PAGE.Loaded.length ] = load_count;
				
					load_count++;
				
					animate_meters( l );
				} else if ( ( status !== 'success' ) &&  (PAGE.cur_page === 'splash' ) ) {
					window.location.href = AJAX_OB[ 'AJAX_META' ][ 'animation' ][ 'uri' ];
			  }
    	}
		);
  }
}

function logo_off_screen() {
	/**
	* description
	*
	* @called : logo_up_and_down
	* @calls : get_animation_speed,
	*					 splash_resize
	*
	* @group : 
	* @page : 
	*/
	
	SPLASH.logo_l = SPLASH.logo.offset().top + SPLASH.logo_l * 5;
	
	SPLASH.logo
		.velocity(
			{ y: '-=' + SPLASH.logo_l },
			{ duration: get_animation_speed( SPLASH.logo_l, 0.2 ) }
		)
    .velocity( { opacity: 0 }, 200 );
		
   SPLASH.logo_animate = true;
	 
   $win.off( 'resize', splash_resize );
}

function logo_up_and_down() {
	/**
	* description
	*
	* @called : logo_up_and_down (self),
	*						mobile,
	*						desktop_functions
	* @calls : logo_up_and_down (self),
	*					 logo_off_screen
	*
	* @group : 
	* @page : splash
	*/
	
	if ( SPLASH.logo_animate ) {
		SPLASH.logo_dir *= -1;
		
		SPLASH.logo
			.velocity(
				{ y: '+=' + ( SPLASH.logo_l * SPLASH.logo_dir ) },
				{ duration: SPLASH.logo_speed,
					complete: logo_up_and_down }
		);
	} else {
		logo_off_screen();
	}
}

function make_ajax_boxes() {
	/**
	* description
	*
	* @called : desktop_once
	* @calls : remove_arr_elem
	*
	* @group : 
	* @page : 
	*/
	
	var tag_start = '<section class="loading_zone hidden" id="',
			cur_id = $body.attr( 'id' ).slice( 4, -5 ),
			i = 0,
			Arr = AJAX_OB.AJAX_META.the_names,
			l;
	
	//changes current to uniform id
	$( '[role=main]' ).attr( 'id', cur_id );
	
	//doesn't duplicate current
	Arr = remove_arr_elem( Arr, cur_id );
	
	l = Arr.length;
	//creates sections
	for ( i; i < l; i++ ) {
		PAGE.sections += tag_start + Arr[ i ] + '"></section>';
	}
	
	//adds
	$( '#the_footer' ).before( PAGE.sections );
	
	//stores
	PAGE.sections = $( PAGE.sections );
}

function make_comic_style_tag() {
	/**
	* description
	*
	* @called : 
	* @calls : nudged_reset,
	*					 return_em,
	*					 abnormal_w_limits,
	*					 get_important_styles
	*
	* @group : 
	* @page : comics
	*/
	
	// re-ordered these vars during re-write august 2015
  var $ab,
			ab_style,
			$abs = $( '.abnormal_panel' ),
			base,
			cols,
			$comic,
			$comics = $( '.comics_page_wrap' ).not( $( '.irregular_comic_layout' ) ),
			comic_w,
			$find = $( '.comics_panel_wrap' ).not( $abs ),
			height,
			i = 0,
			id,
			l = $comics.length,
			$lay_nudges = $('.lay_nudged').not( $abs ),
			$lay_nudge,
			margin,
			max_width,
			min_width,
			$nudge,
			$nudged = $('.nudged'),	
			$ol_id,
			other_condition,
			padding,
			panel_w,
			panels_l,
			$panels,
			rows,
			s_width,
			$style = '<style id="comics_media_queries">',
			vp_width,
			width;
	
	for ( i; i < l; i++ ) {
		$comic = $comics.eq( i );
		$ab = $comic.find( $abs );
		$nudge = $comic.find( $nudged );
		$lay_nudge = $comic.find( $lay_nudges );
		
		id = $comic.attr( 'id' );
		$fig_id = '#comics_page_' + id;
		$ol_id = '#the_comic_' + id;
		
		$panels = $( $ol_id ).find( 'li.comics_panel_wrap' );
		panels_l = $panels.length;
		cols = $( $fig_id ).data( 'cols' );
		
		s_width = $comic.find( $find ).eq( 1 ).width();
		
		min_width = 0;
		base = 0;

		for ( var j = 0; j < cols; j++ ) {
			ab_style = '';
			margin = 4 + ( 2 * j );
			panel_w = s_width * ( j + 1 );
			
			padding = Math.floor( ( ( margin * 2 ) + panel_w ) * 0.0427448340561 ) + 10;
			
			comic_w = ( ( margin * 2 ) * ( j + 1 ) ) + padding * 2 + panel_w;
			
			vp_width = Math.floor( comic_w * 1.111111111111111 );
	
			if ( j === 0 ) {
				base = vp_width;
				
				ab_style += ( $nudge.length ? nudged_reset( $nudge, [ 'top', 'left' ], 0 ) : '' );
				ab_style += ( $lay_nudge.length ? nudged_reset( $lay_nudge, [ 'margin-top', 'margin-left' ], return_em( margin ) ) : '' );
			}
	
			vp_width = vp_width + base;
			
			other_condition = ( j !== cols - 1 ? 'and (max-width: ' + vp_width + 'px)' : '' );
	
			if ( $ab.length ) {
				ab_style += abnormal_w_limits( $ab, comic_w, s_width );
			}
	
			$style += '@media(min-width: ' + min_width + 'px) ' + other_condition + '{' +
									$fig_id + '{width:' + return_em(comic_w) + ';} ' + 
									$ol_id + '{padding: 1em ' + return_em(padding) + ';}' +
									$ol_id + ' > .comics_panel_wrap{margin:' + return_em(margin) + ';} ' +
									$ol_id + ' > .comics_title_wrap{margin-left:' + return_em(margin) + ';}' +
									ab_style + '}';
			
			min_width = 1 + vp_width;
		}
	}

	var $i = 0,
			c,
			$irreg_comics = $( '.irregular_comic_layout .the_comic' ),
			$ab_panels = $( '.abnormal_panel' ).not( $irreg_comics.find( $( 'li' ) ) ),
			$irreg_panels = $( '.irregular_comic_layout img' ),
			$lay_nudged = $( '.lay_nudged' ),
			$elem,
			$this, 
			$parent;
	
	
	c = $comics.length;
  for ( $i; $i < c; $i++ ) {
		$elem = $comics.eq( $i );
		$this = $elem.find( $( '.comics_panel_wrap' ) ).not( $abs ).eq( 1 );
		
		$style += '#' + $elem.attr( 'id' ) + ' .comics_panel_wrap{width:' + return_em( $this.css( 'width' ) ) + '; height:' + return_em( $this.css( 'height' ) ) + ';}';
	}
	
	$i = 0;
	c = $comics.length;
	for ( $i; $i < c; $i++ ) {
		$style += get_important_styles( $ab_panels.eq( $i ), [ 'width','height' ] );
	}		
	
	$i = 0;
	c = $irreg_comics.length;
	for ( $i; $i < c; $i++ ) {
		$elem = $irreg_comics.eq( $i );
		$parent = $elem.parent();
		$this = $elem.children().eq( 1 );
		
		$style += '#' + $parent.attr( 'id' ) +
							'{max-width:' + return_em( $parent.css( 'max-width' ) ) + ';}' +
							'#' + $elem.attr( 'id' ) + ' .comics_panel_wrap{width:' + return_em( $this.css( 'width' ) ) +
							'; height:' + return_em( $this.css( 'height' ) ) + ';}';
	}
	
	$i = 0;
	c = $irreg_panels.length;
	for ( $i; $i < c; $i++ ) {
		$elem = $irreg_panels.eq( $i );
		$style += '#' + $elem.attr( 'id' ) + '{max-width:' +  return_em( $elem.css( 'max-width' ) ) + ';}';
	}

	$i = 0;
	c = $lay_nudged.length;
	for ( $i; $i < c; $i++ ) {
		$style += get_important_styles( $lay_nudged.eq( $i ), [ 'margin-top','margin-left' ] );
	}
	
	$i = 0;
	c = $nudged.length;
	for ( $i; $i < c; $i++ ) {
		$style += get_important_styles( $nudged.eq( $i ), [ 'top','left' ] );
	}

	$( '.comics_page, .the_comic > li, .irregular_comic_layout .comics_panel, .abnormal_panel > .comics_panel' )
		.removeAttr( 'style' );

	$style += '</style>';

	$( $style )
		.insertAfter( $( '#small_query' ) );
}

function make_slug( str ) {
	str = str.split( ' ' );
	str = str.join( '-' );
	return str;
}

function transition_from_splash() {
	var transitionType,
			$winW = $( window ).width(),
			$header = $( 'body > header' ),
			$pageNav = $( '.info_nav' );
	
	if ( !PAGE.is_mobile && $winW > 667 ) { 
		transitionType = 'desktop';
	} else if ( !PAGE.is_mobile && $winW > 480 ) {
		transitionType = 'tablet';
	}
	
	
	
	if ( transitionType === 'desktop' || transitionType === 'tablet' ) {
		$header
			.css({
				top: -100,
				opacity: 0
			});
			
		$pageNav
			.css({
				top: ( transitionType === 'desktop' ? -100 : 'auto' ),
				bottom: ( transitionType === 'desktop' ? 'auto' : -50 ),
				opacity: 0
			});
	}

	
	update_history_and_title( 'animation' );
	
	$( '#animation' )
		.css( 'opacity', 0 )
		.removeClass( 'hidden' )
		.addClass( 'visible' )
		.velocity({
			opacity: 1
		}, 500 );
	
	$( '#splash' )
		.removeClass( 'currentPage' )
		.addClass( 'hidden nextPage' );
		
	$( '.splash_heading' )
		.removeClass( 'splash_heading' )
		.addClass( 'animation_heading' )
		.attr( 'alt', 'animation' );
		
	$( '.nav_page' )
		.removeClass( 'nav_page' )
		.addClass( 'nav_archive' );
	
	$( 'body' )
		.attr( 'id', 'the_animation_page' )
		.removeAttr( 'class' );
		
	get_cur_page();
	pages_once();
	desktop_functions();
	
	if ( transitionType === 'desktop' || transitionType === 'tablet' ) {
		$header
			.velocity({
				top: 0,
				opacity: 1
			},
			{
				delay: 500,
				duration: 1000,
				complete: function() {
					$header.removeAttr( 'style' );
				}
			});
	}

	if ( transitionType === 'desktop' ) {
		$pageNav
			.velocity({
				top: 0,
				bottom: 'auto',
				opacity: 1
			},
			{
				delay: 500,
				duration: 1000,
				complete: function() {
					$pageNav.removeAttr( 'style' );
				}
			});
	}	
	
	if ( transitionType === 'tablet' ) {
		$pageNav.removeAttr( 'style' );
	}	
}

function update_history_and_title( page ) {
	var PageInfo = {
				title: AJAX_OB[ 'AJAX_META' ][ page ][ 'title_tag' ]
			},
			trailingGlyph = ( page === 'splash' ? '' : '/' );
	
	page = ( page === 'splash' ? '' : page );
	
	PageInfo.url = ( window.location.hostname === 'localhost'  ? 'http://localhost:8888/mr_m/' + page : 'http://mrmeteor.natelord.org/' + page + trailingGlyph );
	
	if ( $( 'html' ).hasClass( 'history' ) ) {
		history.pushState( PageInfo, PageInfo.title, PageInfo.url );
	}
	
	$( 'title' ).text( PageInfo.title );
}

function mobile_menu_transition( isFromPopState ) {
	var oldPageType = ( $.inArray( NAV.from, [ 'about', 'contact' ] ) !== -1 ? 'page' : 'cat' ),
			newPageType = ( $.inArray( NAV.to, [ 'about', 'contact' ] ) !== -1 ? 'page' : 'cat' ),
			$oldHeader = $( '#' + NAV.from + '_header_content' ),
			$newHeader = $( '#' + NAV.to + '_header_content' ),
			$oldSection = $( '#' + NAV.from ),
			$newSection = $( '#' + NAV.to ),
			duration = ( isFromPopState ? 0 : 300 ),
			delay = ( isFromPopState ? 0 : 100 );
	
	if ( isFromPopState ) {
		update_mobile_nav_click_state( NAV.to );
		$( 'title' ).text( AJAX_OB[ 'AJAX_META' ][ NAV.to ][ 'title_tag' ] );
	} else {
		update_history_and_title( NAV.to );
	}
	
	if ( $( 'html' ).hasClass( 'mobile_menu_out' ) ) {
		toggle_menu();
	}
	
	if ( NAV.from === 'animation' ) {
		pauseVideo();
	}
	
	$oldSection
		.velocity(
			{ opacity: 0 },
			{ duration: duration,
				delay: 2 * delay,
				complete: function() {
					midTransitionResets();
				}
			}
	);
	
	$oldHeader
		.find( 'h2' )
			.velocity(
				{ top: -80 },
				{ duration: duration,
					delay: 2 * delay }
	);
	
	if ( oldPageType === 'cat' && newPageType === 'page' ) {
		$oldHeader
			.find( '.sub_nav' )
				.velocity(
					{ top: -80 },
					{ duration: duration,
						delay: 2 * delay }
		);
	}
	
	function midTransitionResets() {
		$oldSection
			.addClass( 'hidden' );
			
		$oldHeader
			.find( 'h2' )
				.removeAttr( 'style' );
				
		if ( oldPageType === 'cat' ) {
			$oldHeader
				.find( '.sub_nav' )
					.removeAttr( 'style' )
				.end()
				.find( '.next_btn_wrap' )
					.removeClass( 'clicked' )
				.end()
				.find( '.prev_btn_wrap' )
					.removeClass( 'clicked' )
				.end()
				.find( '.piece_btn.clicked' )
					.removeClass( 'clicked' )
				.end()
				.find( '.piece_btn' )
					.eq( 0 )
						.addClass( 'clicked' );
						
			$oldSection
				.find( '.current' )
					.removeClass( 'current' )
				.end()
				.children()
					.eq( 0 )
						.addClass( 'current' );
		}
		
		if ( newPageType === 'cat' ) {
			$newHeader
				.find( '.next_btn_wrap' )
					.removeClass( 'clicked' )
				.end()
				.find( '.prev_btn_wrap' )
					.addClass( 'clicked' );
		}
			
		$newSection
			.css( 'opacity', 0 )
			.removeClass( 'hidden' );
			
		$newHeader
			.find( 'h2' )
				.css( 'top', -80 );
		
		if ( oldPageType === 'page' && newPageType === 'cat' ) {
			$newHeader
				.find( '.sub_nav' )
					.css( 'top', -80 )
				.end()
				.find( '.category_nav > li' )
					.removeAttr( 'style' );
		}
		
		$( 'body' )
			.attr( 'id', 'the_' + NAV.to + '_page' );
			
		pages_once();

		if ( NAV.to === 'comics' ) {
	
			$( '#scroll_ghost' )
				.css( 'visibility', 'visible' );
		
			updateComicsScroll( 0 );
		}
	
		if ( NAV.from === 'comics' ) {
			$( '#scroll_ghost' )
				.css( 'visibility', 'hidden' );
		}
		
		if ( NAV.from === 'contact' ) {
			resetContactPage();
		}
			
		transitionEnd();
	}
	
	function transitionEnd() {
		pages_once();
		
		$newHeader
			.find( 'h2' )
				.velocity(
					{ top: 0 },
					{ duration: duration }
		);
		
		$newSection
			.velocity(
				{ opacity: 1 },
				{ duration: duration }
		);
		
		if ( oldPageType === 'page' && newPageType === 'cat' ) {
			$newHeader
				.find( '.sub_nav' )
					.velocity(
						{ top: 0 },
						{ duration: duration }
			);
		}
	}
}

function menu_transition( isFromPopState ) {
	var oldPageType = ( $.inArray( NAV.from, [ 'about', 'contact' ] ) !== -1 ? 'page' : 'cat' ),
			newPageType = ( $.inArray( NAV.to, [ 'about', 'contact' ] ) !== -1 ? 'page' : 'cat' ),
			$oldHeader = $( '#' + NAV.from + '_header_content' ),
			$newHeader = $( '#' + NAV.to + '_header_content' ),
			$oldSection = $( '#' + NAV.from ),
			$newSection = $( '#' + NAV.to ),
			duration = ( isFromPopState ? 0 : 300 ),
			delay = ( isFromPopState ? 0 : 100 ),
			$oldElem1,
			$oldElem2,
			$oldElem3,
			$newElem1,
			$newElem2,
			$newElem3;
	
	if ( NAV.from === 'animation' ) {
		pauseVideo();
	}
	
	
	
	if ( isFromPopState ) {
		update_mobile_nav_click_state( NAV.to );
		
		$( 'title' ).text( AJAX_OB[ 'AJAX_META' ][ NAV.to ][ 'title_tag' ] );
		
		if ( NAV.to !== 'contact' ) {
			$( '.info_nav > .contact_wrap.clicked' )
				.removeClass( 'clicked' );
		}
		
		if ( NAV.to !== 'about' ) {
			$( '.info_nav > .about_wrap.clicked' )
				.removeClass( 'clicked' );
		}
		
	} else {
		update_history_and_title( NAV.to );
	}
	
	$oldSection
		.velocity(
			{ opacity: 0 },
			{ duration: duration,
				delay: 2 * delay }
	);

	$oldHeader
		.find( 'h2' )
			.velocity(
				{ top: -80 },
				{ duration: duration,
					delay: 2 * delay }
	);
	
	if ( oldPageType === 'cat' ) {
		$oldElem1 = $oldHeader.find( '.sub_nav' );
		$oldElem2 = $oldHeader.find( '.category_nav li' ).eq( 0 );
		$oldElem3 = $oldHeader.find( '.category_nav li' ).eq( 1 );
	} else {
		$oldElem1 = $oldHeader.find( '.category_nav li' ).eq( 0 );
		$oldElem2 = $oldHeader.find( '.category_nav li' ).eq( 1 );
		$oldElem3 = $oldHeader.find( '.category_nav li' ).eq( 2 );
	}
	
	if ( newPageType === 'cat' ) {
		$newElem1 = $newHeader.find( '.sub_nav' );
		$newElem2 = $newHeader.find( '.category_nav li' ).eq( 0 );
		$newElem3 = $newHeader.find( '.category_nav li' ).eq( 1 );
	} else {
		$newElem1 = $newHeader.find( '.category_nav li' ).eq( 0 );
		$newElem2 = $newHeader.find( '.category_nav li' ).eq( 1 );
		$newElem3 = $newHeader.find( '.category_nav li' ).eq( 2 );
	}
	
	$oldElem1
		.velocity(
			{ top: -80 },
			{ duration: duration,
				delay: 3 * delay }
	);
	
	$oldElem2
		.velocity(
			{ top: -80 },
			{ duration: duration,
				delay: 4 * delay }
	);
	
	$oldElem3
		.velocity(
			{ top: -80 },
			{ duration: duration,
				delay: 5 * delay,
				complete: function() {
					midTransitionResets();
				}
			}
	);
	
	function midTransitionResets() {
		$oldSection
			.addClass( 'hidden' );
		
		$oldHeader
			.find( 'h2' )
				.removeAttr( 'style' );
				
		if ( oldPageType === 'cat' ) {
			$oldHeader
				.find( '.sub_nav' )
					.removeAttr( 'style' )
				.end()
				.find( '.next_btn_wrap' )
					.removeClass( 'clicked' )
				.end()
				.find( '.prev_btn_wrap' )
					.removeClass( 'clicked' )
				.end()
				.find( '.piece_btn.clicked' )
					.removeClass( 'clicked' )
				.end()
				.find( '.piece_btn' )
					.eq( 0 )
						.addClass( 'clicked' );
				
			$oldSection
				.find( '.current' )
					.removeClass( 'current' )
				.end()
				.children()
					.eq( 0 )
						.addClass( 'current' );
		}
		
		if ( newPageType === 'cat' ) {
			$newHeader
				.find( '.next_btn_wrap' )
					.removeClass( 'clicked' )
				.end()
				.find( '.prev_btn_wrap' )
					.addClass( 'clicked' );
		}
			
		$newSection
			.css( 'opacity', 0 )
			.removeClass( 'hidden' );
			
		$newHeader
			.find( 'h2' )
				.css( 'top', -80 );
		
		$newElem1.css( 'top', -80 );
		$newElem2.css( 'top', -80 );
		$newElem3.css( 'top', -80 );

		$( 'body' )
			.attr( 'id', 'the_' + NAV.to + '_page' );
			
		pages_once();
	
		if ( NAV.to === 'comics' ) {
		
			$( '#scroll_ghost' )
				.css( 'visibility', 'visible' );
			
			updateComicsScroll( 0 );
		}
		
		if ( NAV.from === 'comics' ) {
			$( '#scroll_ghost' )
				.css( 'visibility', 'hidden' );
		}
		
		if ( NAV.from === 'contact' ) {
			resetContactPage();
		}
	
		transitionEnd();
	}
	
	function transitionEnd() {
		
		$newHeader
			.find( 'h2' )
				.velocity(
					{ top: 0 },
					{ duration: duration }
		);

		$newSection
			.velocity(
				{ opacity: 1 },
				{ duration: duration }
		);
		
		$newElem1
			.velocity(
				{ top: 0 },
				{ duration: duration,
					delay: 1 * delay }
		);
		
		$newElem2
			.velocity(
				{ top: 0 },
				{ duration: duration,
					delay: 2 * delay }
		);
		
		$newElem3
			.velocity(
				{ top: 0 },
				{ duration: duration,
					delay: 3 * delay }
		);
	}
}

//runs each load on mobile
function mobile() {
	/**
	* description
	*
	* @called : on load event
	* @calls : get_cur_page,
	*					 get_animation_speed,
	*					 splash_resize,
	*					 logo_up_and_down,
	*					 pages_once
	*
	* @group : 
	* @page : 
	*/
	
	
	$win.on( 'resize', function() {
		PAGE.w = $win.width();
		PAGE.h = $win.height();
	});
	
	get_cur_page();

	if ( PAGE.cur_page === 'splash' ) {
		SPLASH.logo = $( '#logo' );
		
		SPLASH.logo_animate = true;
		
		SPLASH.dots_animate = true;

		SPLASH.logo_l = Math.ceil( SPLASH.logo.height() / 5 );
		
		SPLASH.logo_speed = get_animation_speed( SPLASH.logo_l, 0.0073 );
      
		$win.on( 'resize', splash_resize );
		
		logo_up_and_down();
	}
	
	pages_once();
}

function nudged_reset( $elems, Styles, val ) {
	/**
	* description
	*
	* @called : make_comic_style_tag
	*
	* @group : 
	* @page : comics
	*
	* @params {jquery ob} - $elems : 
	*					{?} - Styles :
	*					{?} - val : 
	*/
	
	var $elem,
			i = 0,
			l = $elems.length,
      style = '';
	
	for ( i; i < l; i++ ) {
		$elem = $elems.eq( i );
		
		style += '#' + $elem.parent().attr( 'id' ) + ' > #' + $elem.attr( 'id' ) + '{' + Styles[ 0 ] + ':' + val + ';' + Styles[ 1 ] + ':' + val + ';}';
	}

	return style;
}

function on_scroll( e ) {
	/**
	* description
	*
	* @called : desktop_functions
	*
	* @group : 
	* @page : comics
	*
	* @params {event ob} - e : 
	*/
	
	COMICS.scrolled_elem
		.css(
			{ 'top': ( COMICS.scroll_ghost.scrollTop() * -1 ) } 
	);
}

function pages_once() {
	/**
	* description
	*
	* @called : on load event,
	*						mobile
	* @calls : run_splash (child),
	*					 letters_and_logo_transition,
	*					 dots_fade,
	*					 load_site,
	*					 enter_hover,
	*					 shuffle,
	*					 run_splash,
	*					 run_not_splash (child),
	*					 get_animation_speed,
	*					 menu_transition,
	*					 run_not_splash,
	*					 run_contact (child),
	*					 contact_input_events,
	*					 send_email,
	*					 run_comics (child),
	*					 make_comic_style_tag,
	*					 run_animation (child)
	*
	* @group : 
	* @page :  
	*/
	
	get_cur_page();
	
	if ( PAGE.site_ran ) {
		return;
	}
	
	function run_splash() {
		/**
		* description
		*
		* @called : pages_once(parent)
		* @calls : letters_and_logo_transition,
		*					 dots_fade,
		*					 load_site,
		*					 enter_hover,
		*					 shuffle
		*
		* @group : 
		* @page : splash
		*/
		
		SPLASH.enter = $( '#to_enter' );
    SPLASH.enter_glow = $( '#flash_left, #flash_right' );
		
		if ( !PAGE.is_mobile ) {
			SPLASH.logo = $( '.hero' );
			SPLASH.enter_wrap = $( '.to_enter_wrap' );
			
			
			SPLASH.enter.on('click', function() {
				if ( PAGE.is_site_loaded ) {
					flash_from_splash();
					//letters_and_logo_transition();
				} else {
					SPLASH.enter_wrap
						.velocity(
							{ bottom: -37 },
							{ complete: function() {
									dots_fade();
									
									PAGE.load_pop_up
										.velocity(
											{ bottom: 0 },
											{ complete: function() {
													letters_and_logo_transition();
													// load_site();
												}
											}
									);
								}
							}
					);
				}
			});
    }
		
		SPLASH.enter.on( 'mouseenter mouseleave', enter_hover );
		
    SPLASH.letters = shuffle( $.makeArray( $( '.splash_heading_wrap, .studio_heading_wrap' ).children() ) );
		
		PAGE.splash_ran = true;
	}
	
	if ( PAGE.cur_page === 'splash' && !PAGE.splash_ran ) {
		run_splash();
	}
	
	function run_not_splash() {
		/**
		* description
		*
		* @called : pages_once(parent)
		* @calls : get_animation_speed,
		*					 menu_transition,
		*
		* @group : 
		* @page : 
		*/
		
		var animation_triggers = $( '.comics_category > .ghost, .art_category > .ghost, .animation_category > .ghost, .about_wrap > .ghost, .contact_wrap > .ghost'  ),
				delay,
				duration,
				dir,
				$this;
		
    animation_triggers
			.on( 'click', function() {
				if ( PAGE.transitioning ) {
					return;
				}
				
				PAGE.is_transitioning = true;					
				delay = 0;
				duration = 0;
																			
				$this = $( this );
				
				// $this.addClass( 'clicked' );
				get_cur_page();
				NAV.to = $this.attr( 'data-to' );
				NAV.from = PAGE.cur_page;
				NAV.to_archive = ( $.inArray( NAV.to, NAV.Archive ) !== -1 ? true : false );
				NAV.from_archive = ( $.inArray( NAV.from, NAV.Archive ) !== -1 ? true : false );
				NAV.to_comics = ( NAV.to === 'comics' ? true : false );
				NAV.from_comics = ( NAV.from === 'comics' ? true : false );
				NAV.to_splash = ( NAV.to === 'splash' ? true : false );
				NAV.from_splash = ( NAV.from === 'splash' ? true : false );
				NAV.is_narrow = ( PAGE.w < PAGE.med_min_w ? true : false );                 
																			 
				if ( NAV.is_narrow ) {
					// toggle_menu();
					delay = 400;
				}
																			
																			
				if ( NAV.to_archive && NAV.from_archive ) {
					dir = ( $this.parent().hasClass( 'next_category' ) ? 'down' : 'up' );
					
					// aka to animation ????
					if ( NAV.from === 'comics' && dir === 'down' ) {
						duration = get_animation_speed( COMICS.scroll_ghost.scrollTop(), 1.66 );
																					
						COMICS.scroll_ghost
							.animate(
								{ scrollTop: 0 },
								{ duration: duration,
									easing: 'easeOutQuart' }
						);				
					}
																											
				}					
				
				if ( $( window ).width() <= 479 ) {
					mobile_menu_transition();
				} else {
					//allows for menu animation and or comic scroll
					window.setTimeout( menu_transition, delay );
				}
			}
		);
		PAGE.not_splash_ran = true;
	}
	
	PAGE.not_splash_ran = ( PAGE.is_mobile ? true : PAGE.not_splash_ran );
	
	if ( PAGE.cur_page !== 'splash' && !PAGE.not_splash_ran ) {
		run_not_splash();
	}
	
	function run_contact() {
		/**
		* description
		*
		* @called : pages_once (parent)
		* @calls : contact_input_events,
		*					 send_email
		*
		* @group : 
		* @page : contact
		*/
		
		CONTACT.inputs = $( '#from_input_ghost,  #subject_input_ghost, #email_message_ghost' );
		CONTACT.send_btn = $( '.email_button' );
		CONTACT.input_imgs = $( '#from_input, #subject_input, #email_message, .progress, .submit_text' );
    CONTACT.progresses = $( '.progress' ).find( 'var' );
		CONTACT.marks = $( '.feedback' ).find( 'var' );
		CONTACT.feedback = $( '#feedback' );
		
		contact_input_events();
		
		CONTACT.send_btn.on( 'click', function( e ) {
			e.preventDefault();
			
			if ( PAGE.is_mobile ) {
				$( '<section class="feedback_wrap"></section>' )
					.prependTo( $( '.contact_form_wrap' ) );
				
				$( '.feedback_wrap' )
					.load( AJAX_OB.AJAX_META[ 'feedback' ].uri + ' .feedback_content', function( response, status, xhr ) {
						if ( status === 'success' ) {
							send_email();
						} else {
							// ?
						}
					}
				);
		  } else {
				send_email();
			}
		});
		
		PAGE.contact_ran = true;
	}
	
	if ( PAGE.cur_page === 'contact' && !PAGE.contact_ran ) {
		run_contact();
	}
	
	function run_comics() {
		/**
		* description
		*
		* @called : pages_once (parent)
		* @calls : make_comic_style_tag
		*
		* @group : 
		* @page : comics
		*/
		
    COMICS.articles = $( '.comics_page_wrap' );
		COMICS.section = $( '#comics' );
		
		make_comic_style_tag();
		
		PAGE.comics_ran = true;
	}
	
	if ( PAGE.cur_page === 'comics' && !PAGE.comics_ran ) {
		run_comics();
	}
	
	function run_animation() {
		/**
		* description
		*
		* @called : pages_once (parent)
		*
		* @group : 
		* @page : animation
		*/
		
		ANIMATION.articles = $( '.animation_piece_wrap' );
		ANIMATION.figures = $( '.video_wrap' );
		
		PAGE.animation_ran = true;
	}
	
	if ( PAGE.cur_page === 'animation' && !PAGE.animation_ran ) {
		run_animation();
	}
	
	if ( PAGE.splash_ran &&
			 PAGE.not_splash_ran &&
			 PAGE.contact_ran &&
			 PAGE.comics_ran &&
			 PAGE.animation_ran )
	{
		PAGE.site_ran = true;
	}
}

function position_splash_loading_bar() {
	/**
	* description
	*
	* @called : desktop_functions
	*
	* @group : 
	* @page : splash
	*/
	
	var $meter,
			padding_top;
	
	if ( !PAGE.has_transitions || !PAGE.has_transforms ) {
		return;
	}
	
	$meter = $('html.csstransforms figure.load_meter_wrap');
	padding_top = '';
	
	if ( ( ( PAGE.w > 410 ) && ( PAGE.w < 500 ) ) || ( ( ( PAGE.w < 410 ) && ( PAGE.w > 290 ) ) && ( PAGE.h < 385 ) ) ) {
		padding_top = $meter.height() / 4;
	}
	
	$meter
		.css(
			{ top: $body.height() - $( 'img.load_meter' ).height() + padding_top + 'px',
				opacity: 1 }
	);
}

function prevent_jump() {
	/**
	* description
	*
	* @called : desktop_functions,
	*						pages_once -> run_splash,
	*						pages_once -> run_not_splash
	*
	* @group : 
	* @page : 
	*
	* @params {jquery ob} - $elems : 
	*/
	if ( $( 'html' ).hasClass( 'mobile' ) ) {
		return;
	}
	
	$( 'a[href]' ).attr( 'href', 'javascript:void(0)' );
}
prevent_jump();

function remove_arr_elem( Arr, val ) {
	/**
	* description
	*
	* @called : make_ajax_boxes
	*
	* @group : utility
	* @page : 
	*
	* @params {array} - Arr : 
	*					{?} - val : 
	*/
	
	var remove = $.inArray( val, Arr );
	 
	if ( ~remove ) {
		Arr.splice( remove, 1 );
	}
	
	return Arr;
}

function return_em( num ) {
	/**
	* description
	*
	* @called : get_important_styles,
	*						make_comic_style_tag
	*
	* @group : utility
	* @page : comics
	*
	* @params {int} - num : 
	*/
	
	return( parseInt( num, 10 ) / 10 + 'em' );
}

function send_email() {
	/**
	* description
	*
	* @called : pages_once -> run_contact
	*
	* @group : 
	* @page : contact
	*/
	
	var $content,
	    width,
	    duration = 500;
			
	$.ajax({
		url : AJAX_OB.AJAX_URL,
		data : {
			action: 'email_feedback',
			from: $( '#from_input_ghost' ).val(), 
			to: $( '#to' ).val(), 
			subject: $( '#subject_input_ghost' ).val(), 
			message: $( '#email_message_ghost' ).val()
		},
		dataType: 'json',
		success: function( data ) {
			if( data.email && data.message ) {
				showContactPopUp( 'success' );
				resetContactPage();
			} else if ( data.email && !data.message ) {
				showContactPopUp( 'no_message' );
			} else if ( !data.email && data.message ) {
				showContactPopUp( 'no_email' );
			} else {
				showContactPopUp( 'no_email_or_message' );
			}
		},
		error: function( errorThrown ) {
			// console.log(errorThrown);
		}
	});
}

function set_media_query_widths() {
	/**
	* description
	*
	* @called : desktop_once
	* @calls : get_limits (child),
	*					 get_medium_screen_limits
	*
	* @group : 
	* @page : 
	*/
	
	var $medium = $( '#medium_query' ),
      $small = $( '#small_query' ),
			art_length = AJAX_OB[ 'AJAX_META' ][ 'art' ][ 'the_titles' ].length * 15,
			comics_length = AJAX_OB[ 'AJAX_META' ][ 'comics' ][ 'the_titles' ].length * 15,
			animation_length = AJAX_OB[ 'AJAX_META' ][ 'animation' ][ 'the_titles' ].length * 15,
      num;
			
	function get_limits() {
		/**
		* description
		*
		* @called : set_media_query_widths (parent)
		*
		* @group : 
		* @page : 
		*/
	
		var Result = [ art_length + 502, animation_length + 468, comics_length + 504 ];
		
		Result.sort(
			function( a, b ) {
				return a - b;
			}
		);
		
		return( [ Result[ 2 ], Result[ 2 ] - 187 ] );
	}
	
	num = get_limits();
	
	$medium.attr( { media: '(min-width:' + num[ 1 ] + 'px) and (max-width:' + num[ 0 ] + 'px)' } );
	
	$small.attr( { media: '(max-width: ' + ( num[ 1 ] - 1 ) + 'px)' } );
	
	NAV.win_max = ( num[ 1 ] - 1 );
	
	get_medium_screen_limits();
}

// dd
function shuffle( o ) {
	/**
	* description
	*
	* @called : pages_once -> run_splash
	*
	* @group : 
	* @page : splash
	*
	* @params {object} - o : 
	*/
	
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	
	return o;
};

function splash_resize() {
	/**
	* description
	*
	* @called : desktop_functions,
	*						logo_off_screen,
	*						mobile
	* @calls : get_animation_speed
	*
	* @group : 
	* @page : splash
	*/
	
	if ( SPLASH.logo_l !== Math.ceil( SPLASH.logo.height() / 5 ) ) {
		SPLASH.logo_l = Math.ceil( SPLASH.logo.height() / 5 );
		SPLASH.logo_speed = get_animation_speed( SPLASH.logo_l, 0.0073 );
	}
}

function toggle_menu() {
	var newState = ( $( 'html' ).hasClass( 'mobile_menu_out' ) ? 'in' : 'out' ),
			oldState = ( newState === 'in' ? 'out' : 'in' ),
			left = ( newState === 'in' ? '-306px' : '0px' ),
			duration = 500,
			delay = ( newState === 'in' ? duration : 0 ),	
			$mobileNav = $( '#mobile_nav' );

	$mobileNav
		.velocity(
			{ left: left },
			{ duration: duration }
	);
	
	window.setTimeout(
		function() {
			$( 'html' )
				.addClass( 'mobile_menu_' + newState )
				.removeClass( 'mobile_menu_' + oldState );
		}, delay
	);
}

function transition_out_meter() {
	/**
	* description
	*
	* @called : animate_meters -> animate_meter
	* @calls : letters_and_logo_transition
	*
	* @group : 
	* @page : splash
	*/
	
	PAGE.load_widget
		.velocity(
			{ opacity: 0.1,
		    top:  "+=20px" },
			{ complete: function() {
					PAGE.shadows.velocity( { opacity: 0.75 } );
					PAGE.load_widget.remove();
					unwrap_loading_zones();
					PAGE.is_site_loaded = true;															
				}
			}
	);
}

function unwrap_loading_zones() {
	var $loadingZones = $( '.loading_zone' ),
			l = $loadingZones.length,
			i = 0,
			$this,
			id,
			$child;
			
	for ( i; i < l; i = i + 1 ) {
		$this = $loadingZones.eq( i );
		id = $this.attr( 'id' );
		$this.removeAttr( 'id' );
		
		$child = $this.children().eq( 0 );
		$child
			.attr( 'id', id )
			.addClass( 'hidden' )
			.unwrap();
	}
	
	if ( PAGE.cur_page === 'splash' ) {
		transition_from_splash();
	}
}

// dd
function validate_email( val ) {
	/**
	* description
	*
	* @called : contact_input_events
	*
	* @group : 
	* @page : contact
	*
	* @params {str} - val : 
	*/
	
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	return re.test( val );
}

function vids_vert_responsive() {
	/**
	* description
	*
	* @called : desktop_functions
	*
	* @group : 
	* @page : animation
	*/
	
	var $figure,
			l,
			i;
	// large
	if ( PAGE.w > PAGE.med_max_w ) {
		ANIMATION.margin = 54;
		ANIMATION.max_vp_w = 0.8;
		
		// medium
	} else if ( ( PAGE.w <= PAGE.med_max_w ) && ( PAGE.w > PAGE.med_min_w ) ) {
		ANIMATION.margin = 78;
		ANIMATION.max_vp_w = 0.875;
		
		// small
	} else {
		ANIMATION.margin = 48;
		ANIMATION.max_vp_w = 0.95;
	}
	
	i = 0;
	l = ANIMATION.figures.length;
	for ( i; i < l; i++ ) {
		$figure = ANIMATION.figures.eq( i );
		
		ANIMATION.max_h = $figure.data( 'max_height' ) + ANIMATION.margin;
		ANIMATION.max_w = $figure.data( 'max_width' );
		
		if ( ( ANIMATION.max_h >= PAGE.h ) ||
				 ( ( ANIMATION.max_w >= PAGE.w ) && ( ANIMATION.max_h >= PAGE.h ) )
		) {
			ANIMATION.width = ANIMATION.max_w - Math.round(  ( ANIMATION.max_h - PAGE.h )  *  ( ANIMATION.max_w / ( ANIMATION.max_h-ANIMATION.margin ) ) );
			
			if ( ANIMATION.width > ( PAGE.w * ANIMATION.max_vp_w ) ) {
				ANIMATION.width =  ANIMATION.max_vp_w * 100 + '%';
			}
			
			$figure.css( { 'width': ANIMATION.width } );
		} else {
			$figure.css( { 'width': ANIMATION.max_vp_w * 100 + '%' } );
		}
	}
}

function flash_to_splash() {
	update_history_and_title( 'splash' );
	PAGE.cur_page = 'splash';
	
	$( '#animation' )
		.removeClass( 'current_archive' )
		.addClass( 'hidden' );
		
	$( '.animation_heading' )
		.removeClass( 'animation_heading' )
		.addClass( 'splash_heading' );
	
	$( '#splash' )
		.find( '*[style]' )
		.removeAttr( 'style' );
	
	$( '#splash' )
		.removeClass( 'hidden nextPage' )
		.addClass( 'current_page' );
	
	$( 'body' )
		.attr({
			id: 'the_splash_page',
			class: 'splash page'
		});
}

function flash_from_splash() {
	update_history_and_title( 'animation' );
	PAGE.cur_page = 'animation';
	
	$( 'body' )
		.removeAttr( 'class' )
		.attr( 'id', 'the_animation_page' );
		
	$( '.splash_heading' )
		.removeClass( 'splash_heading' )
		.addClass( 'animation_heading' );
		
	$( '#animation' )
		.removeClass( 'hidden next_archive prev_archive' )
		.addClass( 'current_archive' );
		
	$( '#splash' )
		.removeClass( 'current_page' )
		.addClass( 'next_page hidden' );
}

function windowTransition() {
	var to = document.location.href,
			pages = [ 'art', 'comics', 'animation', 'contact', 'about' ];
	
	NAV.from = PAGE.cur_page;
		
	to = ( to[ to.length - 1 ] === '/' ? to.substr( 0, to.length - 1 ) : to );
	to = to.substr( to.lastIndexOf( '/' ) + 1 );
	to = ( $.inArray( to, pages ) !== -1 ? to : 'splash' );
	
	NAV.to = to;
	
	console.log( 'from: ' + NAV.from + ' to:' + NAV.to );
	
	if ( NAV.from === 'animation' && NAV.to === 'splash' ) {
		flash_to_splash();
	} else if ( NAV.from === 'splash' && NAV.to === 'animation' ) {
		flash_from_splash();
	} else if ( $( window ).width() > 480 ) {
		console.log( 'NAV.to = ' + NAV.to + ' (large)' );
		menu_transition( true );
	} else {
		console.log( 'NAV.to = ' + NAV.to + ' (small)' );
		mobile_menu_transition( true );
	}
}

if ( $html.hasClass( 'history' ) ) {
//	window.onpopstate = windowTransition;
	window.addEventListener( 'popstate', function( event ) {
    if ( event.state ) {
			windowTransition();
    } else if ( PAGE.cur_page === 'animation' ) {
    	flash_to_splash();
    }
	}, false) ;
}



$( '#menu_btn' ).on( 'click', function() {
	toggle_menu();
	
	if ( $( 'html' ).hasClass( 'mobile' ) ) {
		
	}
});


function update_mobile_nav_click_state( cat ) {
	var $btnWrap;
	
	if ( cat === 'about' || cat === 'contact' ) {
		$btnWrap = $( '#mobile_nav .' + cat + '_wrap' );
	} else {
		$btnWrap = $( '#mobile_nav .' + cat + '_category' );
	}
	
	if ( $btnWrap.hasClass( 'clicked' ) ) {
		return;
	}
	
	$btnWrap
		.siblings( '.clicked' )
			.removeClass( 'clicked' );
		
	$btnWrap.addClass( 'clicked' );
}

$( '.art_category > .ghost, .comics_category > .ghost, .animation_category > .ghost, .about_wrap > .ghost, .contact_wrap > .ghost' ).on( 'click', function() {
	var $this = $( this ),
			to = $this.attr( 'data-to' );
	
	if ( $this.parent().hasClass( 'clicked' ) ) {
		return;
	}
	
	if ( to === 'about' || to === 'contact' ) {
		$( '.info_nav > .' + to + '_wrap' )
			.addClass( 'clicked' );
	}
	
	if ( to !== 'about' ) {
		$( '.info_nav > .about_wrap' )
			.removeClass( 'clicked' );
	}
	
	if ( to !== 'contact' ) {
		$( '.info_nav > .contact_wrap' )
			.removeClass( 'clicked' );
	}
	
	update_mobile_nav_click_state( to );
});


// $( '.load_meter_widget, #scroll_ghost' ).css( 'display', 'none' );

// order is important!
if ( !PAGE.is_mobile ) {
	desktop_once();
}

if ( !PAGE.is_mobile ) {
	pages_once();
}

if ( !PAGE.is_mobile ) {
	desktop_functions();
}

if ( PAGE.is_mobile ) {
	mobile();
}


function pauseVideo() {
	var $videos = $( 'video' ),
			i = 0,
			l = $videos.length;
			
	for ( i; i < l; i = i + 1 ) {
		$videos.eq( i )[ 0 ].pause();
	}
}

function animatePiece( newIndex, cat ) {
	var $piece_btns = $( '#' + cat + '_header_content .piece_btn' ),
			$pieces = $( '#' + cat ).children(),
			$currentPiece = $pieces.filter( '.current' ),
			$nextPiece = $pieces.eq( newIndex ),
			oldIndex = $pieces.index( $currentPiece ),
			dir = ( newIndex > oldIndex ? 'left' : 'right' ),
			dist =  $( window ).width(),
			duration = get_animation_speed(  dist, 0.75 );
	
	if ( cat === 'animation' ) {
		pauseVideo();
	}
	
	$nextPiece
		.css( 'left', ( dir === 'left' ? ( dist * -1 ) : dist ) )
		.velocity(
			{ left: 0 },
			{ duration: duration,
				complete: function() {
					$nextPiece
						.addClass( 'current' )
						.attr( 'style', $nextPiece.attr( 'data-default_style' ) );
						
					if ( cat === 'comics' ) {
						updateComicsScroll( newIndex );
					}
				}
			}
	);
	
	$currentPiece
		.velocity(
			{ left:  ( dir === 'left' ? dist : ( dist * -1 ) ) },
			{ duration: duration,
			  complete: function() {
			  	$currentPiece
						.removeClass( 'current' )
						.attr( 'style', $currentPiece.attr( 'data-default_style' ) );
						
					NAV.is_animating = false;
			  } 
			}
	);
	
	$piece_btns
		.filter( '.clicked' )
			.removeClass( 'clicked' );
		
	$piece_btns
		.eq( newIndex )
			.addClass( 'clicked' );
	
	if ( newIndex === ( $pieces.length - 1 ) ) {
		$( '#' + cat + '_header_content .next_btn_wrap' ).addClass( 'clicked' );
	} else if ( newIndex === 0 ) {
		$( '#' + cat + '_header_content .prev_btn_wrap' ).addClass( 'clicked' );
	}
	
	if ( oldIndex === ( $pieces.length - 1 ) ) {
		$( '#' + cat + '_header_content .next_btn_wrap' ).removeClass( 'clicked' );
	} else if ( oldIndex === 0 ) {
		$( '#' + cat + '_header_content .prev_btn_wrap' ).removeClass( 'clicked' );
	}
}

function updateComicsScroll( index ) {
	COMICS.scroll_ghost
		.off( 'scroll', on_scroll )
		.scrollTop( 0 );
	
  COMICS.height_elem = COMICS.articles.eq( index );
  COMICS.scrolled_elem = COMICS.height_elem;
	COMICS.cur_height = COMICS.height_elem.height();
	
	check_scroll_height();
	
	COMICS.scroll_ghost
		.on( 'scroll', on_scroll );
}

function setUpNextPrevNav() {
	$( '.next_btn, .prev_btn' )
		.on( 'click', function() {
			var $this = $( this ),
					indexShift,
					cat,
					newIndex,
					$pieces;
			
			if ( $this.parent().hasClass( 'clicked' ) || NAV.is_animating ) {
				return;
			}
			
			NAV.is_animating = true;
			
			indexShift = ( $this.hasClass( 'next_btn' ) ? 1 : -1 );
			
			cat = $this.attr( 'data-cat' );
			
			$pieces = $( '#' + cat ).children();
			
			newIndex = $pieces.index( $pieces.filter( '.current' ) ) + indexShift;
			
			animatePiece( newIndex, cat );
		}
	);
}
setUpNextPrevNav();

function setUpTabNav() {
	$( '.to_piece' )
		.on( 'click', function() {
			var $this = $( this ),
					cat,
					newIndex;
					
			if ( $this.parent().hasClass( 'clicked' ) || NAV.is_animating ) {
				return;
			}
			
			NAV.is_animating = true;
			
			cat = $this.attr( 'data-cat' );
			
			newIndex = $( '#' + cat + '_header_content' ).find( '.to_piece' ).index( $this );
			
			animatePiece( newIndex, cat );
		}
	);
}
setUpTabNav();

function resetContactPage() {
	var $from = $( '#from_input_ghost' ),
			$subject = $( '#subject_input_ghost' ),
			$message = $( '#email_message_ghost' );
			
	$from
		.val( $from.attr( 'data-initial_val' ) );
	
	$subject
		.val( $subject.attr( 'data-initial_val' ) );
		
	$message
		.val( $message.attr( 'data-initial_val' ) );
	
	
	$( '#contact .var_true' )
		.attr( 'class', 'var_false' )
		.removeAttr( 'style' )
		.text( 'incomplete' );
		
	$( '#contact .progress_true' )
		.attr( 'class', 'progress_false' )
		.removeAttr( 'style' )
		.text( 'needs to be' );
			
}
// resetContactPage();

function showContactPopUp( str ) {
	var $popUp = $( '#contact_pop_up' ),
			$popUpWrap = $( '#contact_pop_up_wrap' );
			
	$popUpWrap
		.css( 'opacity', 0 )
		.removeClass( 'hide_pop_up' )
		.addClass( 'show_pop_up' );
		
	$popUp
		.css( 'margin-top', 30 )
		.attr( 'class', str );
	
	$popUp
		.velocity(
			{ 'margin-top': 0 },
			{ duration: 200,
				delay: 100 }
	);
	
	$popUpWrap
		.velocity(
			{ opacity: 1 },
			{ duration: 300,
				delay: 100,
				complete: function() {
					$popUp
						.removeAttr( 'style' );
						
					$popUpWrap
						.removeAttr( 'style' );
				}
			}
	);
}

function hideContactPopUp() {
	var $popUp = $( '#contact_pop_up' ),
			$popUpWrap = $( '#contact_pop_up_wrap' );
	
	$popUp
		.velocity(
			{ 'margin-top': 30 },
			{ duration: 300,
				delay: 100,
				complete: function() {
					$popUpWrap
						.removeClass( 'show_pop_up' )
						.addClass( 'hide_pop_up' )
						.removeAttr( 'style' );
						
					$popUp
						.removeAttr( 'style' );
				}
			}
	);
	
	$popUpWrap
		.velocity(
			{ opacity: 0 },
			{ duaration: 200,
				delay: 100 }
	);
}

$( '#contact_pop_up_wrap' ).on( 'click', function() {
	hideContactPopUp();
});

});