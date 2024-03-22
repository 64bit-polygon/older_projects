<?php get_header(); ?>
<section class="about_content_wrap"
         role="main">
	<article class="about_content">
<?php 
	if( get_field('about_paragraphs') ): while( has_sub_field('about_paragraphs') ):
		$about_p = get_sub_field('about_paragraph'); 
?>
		<p class="about_p">
			<?php echo $about_p; ?>
		</p>
<?php
	endwhile;
	endif;
?>
	</article>
</section>
<?php get_footer(); ?>