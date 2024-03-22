<?php
	get_header();
	
	$video_dir = get_stylesheet_directory_uri() . '/video/';
	$posts_count = get_category(get_category( get_query_var( 'cat' ) )->cat_ID)->count;
	$section_width = 100 * $posts_count . '%';
	$post_width = 100 / $posts_count . '%';
	$Max_W = array();
	$i = 0;

	//get all the video max-widths
	if (have_posts()) : while (have_posts()) : the_post();
		$Max_W[] = get_field('vid_w');
	endwhile; endif; 

	$max_width = array_sum ( $Max_W ) + ( 60 * ($posts_count) ) . 'px';
?>
<section class="animation_group"
				 role="main" 
				 data-width="<?php echo $section_width; ?>"
				 style="width:<?php echo $section_width; ?>">
	
<?php 
	if (have_posts()) : while (have_posts()) : the_post(); 
	
	$post_name = $post->post_name;
	$vid_w = get_field('vid_w');
	$vid_h = get_field('vid_h');
	$mp4_filename = get_field('mp4_filename');
	$ogv_filename = get_field('ogv_filename');
	$poster_url = get_field('poster');
	$alt = get_field('vid_alt');
	$class = '';
	
	if( $i === $posts_count - 1 ){
		$class .= ' last_piece';
	} elseif( !$i ) {
		$class .= ' current';
	}
?>  
	
	<article id="<?php echo $post_name; ?>" 
					 class="animation_piece_wrap<?php echo $class; ?>"
					 style="width:<?php echo $post_width; ?>" data-default_style="width:<?php echo $post_width; ?>">
	  <figure class="video_wrap"
				    style="max-width:<?php echo $vid_w; ?>px;
			             max-height:<?php echo $vid_h; ?>px;"
						data-max_width="<?php echo $vid_w; ?>"
						data-max_height="<?php echo $vid_h; ?>">

						
			<video class="video_player" controls="true" id="<?php echo $post_name; ?>_player" poster="<?php echo $poster_url; ?>">
				<source src="<?php echo $video_dir . $ogv_filename; ?>" type="video/ogg">
				<source src="<?php echo $video_dir . $mp4_filename; ?>" type="video/mp4">
			</video>
						
						<!--
			<iframe src="<?php echo $src; ?>?wmode=opaque&api=1&player_id=<?php echo $post_name; ?>_player"
				      class="video_player" 
							id="<?php echo $post_name; ?>_player"
							width="<?php echo $vid_w; ?>" 
							height="<?php echo $vid_h; ?>" 
							frameborder="0">
			</iframe>
							-->
			<figcaption class="visually_hidden">
				<?php echo $alt; ?>
			</figcaption>		
		</figure>
	</article>
	
<?php 
	$i++;
	endwhile; endif;
?>

</section>

<?php get_footer(); ?>