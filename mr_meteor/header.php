<?php
	global $is_safari;
	$class = 'mobile_menu_out';
	
	if($is_safari){
		$class .= ' safari';
	}

	if( is_mobile() ){
		$class .= ' mobile';
	} else {
		$class .= ' no-mobile';
	}
	//$class .= ' mobile';
	$class = trim($class);
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js <?php echo $class; ?>">
<head>
	<meta http-equiv="content-type" 
	      content="<?php bloginfo('html_type'); ?>"
				charset="<?php bloginfo('charset'); ?>"/>
<?php
	$id = ( is_page() ? $post->ID : 'category_' . (get_category( get_query_var( 'cat' ) )->cat_ID) );
	$title = (is_404() ? '404 Error' : get_field( 'win_title', $id ) );
	 
	if( is_page() ){
		$meta_desc = get_field( 'page_des_meta', $id );
	} else {
		$meta_desc = strip_tags(category_description( get_category( get_query_var( 'cat' ) )->cat_ID ));
	}
	
	$style_dir = get_stylesheet_directory_uri();
  
?>
	<title><?php echo $title; ?></title>
	 
	<meta name="description" 
	      content="<?php echo $meta_desc; ?>"/>
	<meta name="HandheldFriendly" 
	      content="True"/>
  <meta name="MobileOptimized"
	      content="320"/>
  <meta name="viewport"
	      content="width=device-width, initial-scale=1, user-scalable=no"/>
  <meta http-equiv="cleartype"
	      content="on"/>
				
	<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?php echo $style_dir; ?>/apple-touch-icon-57x57.png" />
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo $style_dir; ?>/apple-touch-icon-114x114.png" />
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo $style_dir; ?>/apple-touch-icon-72x72.png" />
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo $style_dir; ?>/apple-touch-icon-144x144.png" />
	<link rel="apple-touch-icon-precomposed" sizes="60x60" href="<?php echo $style_dir; ?>/apple-touch-icon-60x60.png" />
	<link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?php echo $style_dir; ?>/apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon-precomposed" sizes="76x76" href="<?php echo $style_dir; ?>/apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php echo $style_dir; ?>/apple-touch-icon-152x152.png" />
	<link rel="icon" type="image/png" href="<?php echo $style_dir; ?>/favicon-196x196.png" sizes="196x196" />
	<link rel="icon" type="image/png" href="<?php echo $style_dir; ?>/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/png" href="<?php echo $style_dir; ?>/favicon-32x32.png" sizes="32x32" />
	<link rel="icon" type="image/png" href="<?php echo $style_dir; ?>/favicon-16x16.png" sizes="16x16" />
	<link rel="icon" type="image/png" href="<?php echo $style_dir; ?>/favicon-128.png" sizes="128x128" />
	<meta name="application-name" content="&nbsp;"/>
	<meta name="msapplication-TileColor" content="#FFFFFF" />
	<meta name="msapplication-TileImage" content="<?php echo $style_dir; ?>/mstile-144x144.png" />
	<meta name="msapplication-square70x70logo" content="<?php echo $style_dir; ?>/mstile-70x70.png" />
	<meta name="msapplication-square150x150logo" content="<?php echo $style_dir; ?>/mstile-150x150.png" />
	<meta name="msapplication-wide310x150logo" content="<?php echo $style_dir; ?>/mstile-310x150.png" />
	<meta name="msapplication-square310x310logo" content="<?php echo $style_dir; ?>/mstile-310x310.png" />
   
	<link rel="stylesheet" 
	      type="text/css" 
				href="<?php echo $style_dir; ?>/styles/normalize.css"/>
  <link rel="stylesheet" 
	      type="text/css" 
				href="<?php echo get_stylesheet_uri(); ?>"/>
  <link rel="stylesheet"
	      type="text/css"
        media="(min-width:480px) and (max-width:667px)"
        href="<?php echo $style_dir; ?>/styles/medium.css"
        id="medium_query" />
  <link rel="stylesheet"
	      type="text/css"
        media='(max-width: 479px)'
        href='<?php echo $style_dir; ?>/styles/small.css'
        id="small_query" />
<?php
      wp_head();
      $is_page = is_404() || is_page();
      $page_name = ( is_category() ? get_category(get_query_var('cat'))->slug : get_post(get_queried_object_id())->post_name );
      $page_name = ( is_404() ? 'four_oh_four' : $page_name );
      $img_path = content_url() . '/uploads/replaced.gif';
			$is_comics = is_category('comics');
			$header_class = ( $is_comics ? 'class="comics_header"' : '' );
			
			$body_class = ( $is_page ? 'class="page"' : '');
			$body_class = ( is_front_page() ? 'class="splash page"' : $body_class);
			
	    $categories = get_categories( $args );
	    $cur_cat = 1; $prev_cat = 3; $next_cat = 2;
	    if( ! $is_page ){
	       $cur_cat = get_query_var('cat');
	       for( $i = 0, $c = count($categories); $i <= $c; $i++ ){
	          if( $categories[$i]->cat_ID == $cur_cat ){
	             $cur_cat = $i;
	             break;
	          }
	       }
	       $prev_cat = ( $cur_cat == 1 ? $c : $cur_cat -1 );
	       $next_cat = ( $cur_cat == $c ? 1 : $cur_cat +1 );
	    }
			
			if( $is_page ){
			  $cur_cat_url = get_category_link( get_cat_ID( 'animation' ) );
			} else {
				$cur_cat_url = get_category_link( $categories[$cur_cat]->cat_ID );
			}
			
			$cur_cat_slug = $categories[$cur_cat]->slug;

			$prev_cat_slug = $categories[$prev_cat]->slug;
			$prev_cat_url = get_category_link( $categories[$prev_cat]->cat_ID );			
			
			$next_cat_slug = $categories[$next_cat]->slug;
			$next_cat_url = get_category_link( $categories[$next_cat]->cat_ID );
			
			$is_about = is_page('about');
			$about_url = get_page_link( get_page_by_title( 'about' )->ID );
			
			$is_contact = is_page('contact');
			$contact_url = get_page_link( get_page_by_title( 'contact' )->ID );
?>
</head>
<body <?php echo $body_class; ?>  id="the_<?php echo $page_name; ?>_page"> 
<!--[if lt IE 7]>
	<p class="browsehappy">
		You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.
	</p>
<![endif]-->
	<div class="frame_shadow_corner frame_shadow"
	     id="top_l_c" ></div>
  <div class="frame_shadow"
	     id="top_b"></div>
  <div class="frame_shadow_corner frame_shadow" 
	     id="top_r_c"></div>
  <div class="frame_shadow" 
	     id="right_b"></div>
  <div class="frame_shadow_corner frame_shadow" 
	     id="bottom_r_c"></div>
  <div class="frame_shadow" 
	     id="bottom_b"></div>
  <div class="frame_shadow_corner frame_shadow" 
	     id="bottom_l_c"></div>
  <div class="frame_shadow" 
	     id="left_b"></div>
				
	<noscript>
		<p class="no_script_popup">
			I'm sorry but it looks like your javascript is not enabled. Please set it and refresh the page.
		</p>
	</noscript>
	
	<header>
		<img class="to_splash_drop_shadow replaced_img" 
			   src="<?php echo $img_path; ?>" 
				 id="to_splash_drop_shadow" />
		<img class="header_drop_shadow replaced_img" 
			   src="<?php echo $img_path; ?>" 
				 id="header_drop_shadow" />
      
		<h1 class="to_splash_wrap">
      <figure class="to_splash_icon_wrap">
      	<a href="<?php echo home_url('/'); ?>" 
					 class="to_splash"></a>
        <img class="home_icon replaced_img"
						 src="<?php echo $img_path; ?>"
						 alt="splash" />
			</figure>
		</h1>
		
<?php
	$the_pages = [ 'about', 'contact' ];
	$l = count( $the_pages );
	$i = 0;
	
	for ( $i; $i < $l; $i = $i + 1 ) {
?>
	<div class="header_content" id="<?php echo $the_pages[ $i ]; ?>_header_content">
		<h2 class="heading <?php echo $the_pages[ $i ]; ?>_heading"></h2>
		<nav class="nav_page">
      <ul class="category_nav">
        <li class="animation_category">
          <a href="<?php echo get_category_link( get_cat_ID( 'animation' ) ); ?>"
						 class="to_animation ghost"
						 data-to="animation"></a>
           <figure class="animation_text replaced_img"></figure>
         </li>
         <li class="art_category">
           <a href="<?php echo get_category_link( get_cat_ID( 'art' ) ); ?>" 
							class="to_art ghost"
							data-to="art"></a>
           <figure class="art_text replaced_img"></figure>
         </li>
         <li class="comics_category">
           <a href="<?php echo get_category_link( get_cat_ID( 'comics' ) ); ?>"
							class="to_comics ghost"
							data-to="comics"></a>
           <figure class="comics_text replaced_img"></figure>
        </li>
      </ul>
		</nav>
		
	</div>
<?php	
	}
	
	$the_archives = [ 'animation', 'art', 'comics' ];
	$l = count( $the_archives );
	$i = 0;

	for ( $i; $i < $l; $i = $i + 1 ) {
		if ( $the_archives[ $i ] === 'animation' ) {
			$first_archive = 'art';
			$second_archive = 'comics';
		} elseif ( $the_archives[ $i ] === 'art' ) {
			$first_archive = 'comics';
			$second_archive = 'animation';
		} else {
			$first_archive = 'animation';
			$second_archive = 'art';
		}
	
?>


	<div class="header_content" id="<?php echo $the_archives[ $i ]; ?>_header_content">
		<h2 class="heading <?php echo $the_archives[ $i ]; ?>_heading"></h2>
		<nav class="nav_archive">
			<menu class="sub_nav">
        <li class="prev_btn_wrap clicked">
          <button class="prev_btn ghost" data-cat="<?php echo $the_archives[ $i ]; ?>"></button>
          <figure class="left_arrow_icon replaced_img"></figure>
        </li>
				
<?php
	$cat = get_category_by_slug( $the_archives[ $i ] ); 
	$cat_id = $cat->term_id;
	$args = array(
	   'posts_per_page' => -1,
	   'post_type' => 'post',
		 'cat' => $cat_id
	);
	$myquery = new WP_Query( $args );
	$j = 0;
	$c = $myquery->found_posts;
	for ( $j; $j < $c; $j = $j + 1 ) {
		$cur_tab_class = ( $j === 0 ? ' clicked' : '' );
		
?>
				
        <li class="piece_btn<?php echo $cur_tab_class; ?>">
          <a class="to_piece ghost"
						 href="#"
						 data-cat="<?php echo $the_archives[ $i ]; ?>"></a>
           <figure class="tab_icon replaced_img"></figure>
         </li>
<?php
	}
?>

        <li class="next_btn_wrap">
          <button class="next_btn ghost" data-cat="<?php echo $the_archives[ $i ]; ?>"></button>
          <figure class="right_arrow_icon replaced_img"></figure>
        </li>
			</menu>
			
			
      <ul class="category_nav">
        <li class="<?php echo $first_archive; ?>_category">
          <a href="<?php echo get_category_link( get_cat_ID( $first_archive ) ); ?>"
						 class="to_<?php echo $first_archive; ?> ghost"
						 data-to="<?php echo $first_archive; ?>"></a>
           <figure class="<?php echo $first_archive; ?>_text replaced_img"></figure>
         </li>
         <li class="<?php echo $second_archive; ?>_category">
           <a href="<?php echo get_category_link( get_cat_ID( $second_archive ) ); ?>" 
							class="to_<?php echo $second_archive; ?> ghost"
							data-to="<?php echo $second_archive; ?>"></a>
           <figure class="<?php echo $second_archive; ?>_text replaced_img"></figure>
         </li>
			</ul>
		</nav>
	</div>

<?php	
	}
?>
		<div class="header_content" id="mobile_header_content">
			<ul id="mobile_nav">
				<?php
					if ( $page_name === 'animation' || $page_name === 'splash' ) {
						echo '<li class="animation_category clicked">';
					} else {
						echo '<li class="animation_category">';
					}
				?>
          <a href="<?php echo get_category_link( get_cat_ID( 'animation' ) ); ?>"
						 class="to_animation ghost"
						 data-to="animation"></a>
           <figure class="animation_text replaced_img"></figure>
         </li>
         <li class="art_category<?php echo ( $page_name === 'art' ? ' clicked' : '' ); ?>">
           <a href="<?php echo get_category_link( get_cat_ID( 'art' ) ); ?>" 
							class="to_art ghost"
							data-to="art"></a>
           <figure class="art_text replaced_img"></figure>
         </li>
         <li class="comics_category<?php echo ( $page_name === 'comics' ? ' clicked' : '' ); ?>">
           <a href="<?php echo get_category_link( get_cat_ID( 'comics' ) ); ?>"
							class="to_comics ghost"
							data-to="comics"></a>
           <figure class="comics_text replaced_img"></figure>
        	</li>
	      <li class="about_wrap<?php echo ( $page_name === 'about' ? ' clicked' : '' ); ?>">
	        <a href="<?php echo $about_url; ?>" 
						 class="to_about ghost"
						 data-to="about"></a>
	        <figure class="about_text replaced_img"></figure>
	      </li>
	      <li class="contact_wrap<?php echo ( $page_name === 'contact' ? ' clicked' : '' ); ?>">
	        <a href="<?php echo $contact_url; ?>"
						 class="to_contact ghost"
						 data-to="contact"></a>
	        <figure class="contact_icon replaced_img"></figure>
	      </li>
			</ul>
	    <div class="menu_icon_wrap">
	      <button class="menu_btn ghost"
								id="menu_btn"></button>
	      <figure class="menu_icon replaced_img"></figure>
			</div>
		</div>
	</header>
		
    <ul class="info_nav">
      <li class="about_wrap<?php echo($is_about ? ' clicked' : ''); ?>">
        <a href="<?php echo $about_url; ?>" 
					 class="to_about ghost"
					 data-to="about"></a>
        <figure class="about_text replaced_img"></figure>
      </li>
      <li class="contact_wrap<?php echo($is_contact ? ' clicked' : ''); ?>">
        <a href="<?php echo $contact_url; ?>"
					 class="to_contact ghost"
					 data-to="contact"></a>
        <figure class="contact_icon replaced_img"></figure>
      </li>
    </ul>
		
		<aside class="load_meter_widget">
			<figure class="load_meter_pop_up">
				<div class="load_meter_wrap">
					<div class="load_meter_max">
						<div class="load_meter_bar_holder">
							<div class="load_meter_bar">
							</div>
						</div>
					</div>
				</div>
				<figcaption class="load_meter_caption">
					<em>loading</em>
					<span class="dot" id="dot_1">.</span>
					<span class="dot" id="dot_2">.</span>
					<span class="dot" id="dot_3">.</span>
				</figcaption>
			</figure>
		</aside>