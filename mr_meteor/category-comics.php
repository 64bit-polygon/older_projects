<?php 
	get_header();
	$posts_count = get_category(get_category( get_query_var( 'cat' ) )->cat_ID)->count; 
	$j = 0;
?>
   <section class="comics_group"
	 					role="main"
						style="width:<?php echo ($posts_count * 100 . '%'); ?>;">
<?php
	if (have_posts()) : while (have_posts()) : the_post();
	$layout = ( get_field( 'comic_layout_type' ) == 'irregular_pattern' ? ' irregular_comic_layout': '');
	
	$class = '';
	if( $i === $posts_count - 1 ){
		$class .= ' last_piece';
	} elseif(!$i){
		$class .= ' current';
	}
?>
      <article id="<?php echo $post->post_name; ?>"
               style="width:<?php echo (100/$posts_count) . '%'; ?>;"
							 data-default_style="width:<?php echo (100/$posts_count) . '%'; ?>"
							 class="comics_page_wrap<?php echo $layout . $class; ?>">
<?php 
	$j++;
	if( get_field('comic_array') ):
		$Panel_Arr = get_field('comic_array');
		$Panel_H = array();
		$Panel_W = array();
		$Irreg_Max_W = array();
		for( $i = 0, $l = count($Panel_Arr); $i < $l; $i++ ){
			if( ! $Panel_Arr[$i]['var_w']){
				$Panel_H[$i] = wp_get_attachment_image_src($Panel_Arr[$i]['comic_img'], 'full')[2];
				$Panel_W[$i] = wp_get_attachment_image_src($Panel_Arr[$i]['comic_img'], 'full')[1];
			}
			$Irreg_Max_W[$i] = wp_get_attachment_image_src($Panel_Arr[$i]['comic_img'], 'full')[1];
		}
		$cols = get_field( col_count );
		$tallest = max($Panel_H);
		$widest = max($Panel_W);
		$irregular_max_width = max($Irreg_Max_W);
		//$min_width = $min_width + $min_width/25 + 25;
		if (get_field( 'comic_layout_type' ) == 'irregular_pattern'){
			$max_width = $irregular_max_width + ( $irregular_max_width / 10 );
		} else {
			$max_width = ($widest * $cols + (($widest * $cols)/25) * $cols - 1 + 25) + 100;//max-width of optimum cols flush + margins on panels + padding on page
		}
?>
         <figure class="comics_page"
				 				 id="comics_page_<?php echo $post->post_name; ?>"
								 data-cols="<?php the_field( col_count ); ?>"
								 style="max-width:<?php echo $max_width;?>px;">
		      <ol class="the_comic clearfix"
					    id="the_comic_<?php echo $post->post_name; ?>">
		         <li class="comics_title_wrap">
		            <h3 class="comics_title"><?php echo the_title();?></h3>
		         </li>
<?php 
	$i = 1;
	$l = count(get_field('comic_array'));
	while( has_sub_field('comic_array') ):
		$vert_nudge = ( get_sub_field('var_vert') ? 'top:' . get_sub_field('var_vert') * -1 . 'px;' : '');
		$vert_lay_nudge = ( get_sub_field('lay_vert') ? 'margin-top:' . get_sub_field('lay_vert') * -1 . 'px;' : '');
		$horz_nudge = ( get_sub_field('var_horz') ? 'left:' . get_sub_field('var_horz') . 'px;' : '' );
		$horz_lay_nudge = ( get_sub_field('lay_horz') ? 'margin-left:' . get_sub_field('lay_horz') . 'px;' : '');
		$class = '';
		
		if( $i === $l ){
			$class .= ' comics_panel_last';
		}
		if( $vert_lay_nudge || $horz_lay_nudge ){
			$class .= ' lay_nudged';
		}
		if( get_sub_field('var_w') || get_sub_field('var_h' ) ){
			$class .= ' abnormal_panel abnormal_panel' . $i;
		}
		/*
			old classing system:
			class="comics_panel_wrap<?php echo ( $i == $l ? ' comics_panel_last' : ''); echo($vert_lay_nudge || $horz_lay_nudge ? ' lay_nudged' : ''); echo ( get_sub_field('var_w') || get_sub_field('var_h' ) ? ' abnormal_panel abnormal_panel' . $i : '' );?>"
		*/
?>
			      <li class="comics_panel_wrap <?php echo $class; ?>" 
							  id="<?php echo $post->post_name . '_' . $i ?>" 
								style="width:<?php echo ( get_sub_field('var_w') ? intval(get_sub_field('var_w')) : $widest ); ?>px;height:<?php echo ( get_sub_field('var_h') ? intval(get_sub_field('var_h')) : $tallest ); ?>px;<?php echo( $vert_lay_nudge || $horz_lay_nudge ? $vert_lay_nudge . $horz_lay_nudge : '' ); ?>">
<?php $panel = wp_get_attachment_image_src( get_sub_field( 'comic_img' ), 'full' );
      if(get_field( 'comic_layout_type' ) == 'irregular_pattern' ) {
         $style = 'style=max-width:' . $panel[1] . 'px;';
         $nudged = ( $vert_nudge || $horz_nudge ? [' nudged', $style .= $vert_nudge . $horz_nudge] : ['', $style]);
      } else {
         $nudged = ( $vert_nudge || $horz_nudge ? [' nudged', 'style=' . $vert_nudge . $horz_nudge] : ['','']);
      }
      $var_w = get_sub_field('var_w');
      ?>
					   <img class="comics_panel<?php echo $nudged[0]; ?>" id="<?php echo $post->post_name . '_img_' . $i ?>" src="<?php echo $panel[0]; ?>" alt="<?php the_sub_field( 'comic_alt' ); ?>" <?php echo $nudged[1]; ?> />
<?php echo ( $i == $l ? '<b class="last_panel_text">' . get_field('last_panel') . '</b>' : ''); ?>
			      </li>
<?php
	$i = $i + 1;
	endwhile;
?>
		      </ol>
         </figure>
<?php
	endif;
?>
      </article>
<?php
	endwhile;
  endif;
?> 
   </section>
<?php
	get_footer();
?>