<?php 
	get_header();

	$posts_count = get_category(get_category( get_query_var( 'cat' ) )->cat_ID)->count;
	$section_width = 100 * $posts_count . '%';
	$post_width = 100 / $posts_count . '%';
	$i = 0;
	
?>
<section class="art_group" 
			   role="main" 
				 style="width:<?php echo $section_width; ?>;">
				 
<?php 
	if (have_posts()) : while (have_posts()) : the_post(); 
          
	$src = wp_get_attachment_image_src( get_field('art_img'), 'full' )[0];
	$post_name = $post->post_name;
	
	$class = '';
	if( $i === $posts_count - 1 ){
		$class .= ' last_piece';
	} elseif(!$i){
		$class .= ' current';
	}
	
	$alt = get_field('art_alt');
?> 
	<figure id="<?php echo $post_name; ?>"
          class="art_piece_wrap<?php echo $class; ?>"
          style="width:<?php echo $post_width; ?>;"
					data-default_style="width:<?php echo $post_width; ?>">
    <img src="<?php echo $src; ?>" 
		     alt="<?php echo $alt; ?>"/>
	</figure>
<?php 
	$i++;
	endwhile;endif; 
?>
   
</section>
	 
<?php get_footer(); ?>