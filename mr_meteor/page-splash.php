<?php
	get_header();
	$content_url = content_url();
	$style_sheet_dir = get_stylesheet_directory_uri();
	$animation_url = get_category_link( get_cat_ID( 'Animation' ) );
?>
	<section class="splash_group"
	         role="main">
	  <h1 class="splash_heading">
			
			<div class="splash_heading_ratio_fix"></div>
			<figure class="splash_heading_wrap">
				<div class="m1_wrap">
					<img class="m1_wrap" 
					     src="<?php echo $content_url; ?>/uploads/m1.png"
							 alt="Mr Meteor" />
				</div>
				<div class="r1_wrap">
					<img class="r1"
					     src="<?php echo $content_url; ?>/uploads/r1.png"
							 alt=" " />
        </div>
				<div class="m2_wrap">
					<img class="m2" 
					  	 src="<?php echo $content_url; ?>/uploads/m2.png"
						   alt=" " />
        </div>
				<div class="e1_wrap">
					<img class="e1"
							 src="<?php echo $content_url; ?>/uploads/e1.png"
							 alt=" " />
        </div>
				<div class="t1_wrap">
					<img class="t1"
							 src="<?php echo $content_url; ?>/uploads/t1.png"
							 alt=" " />
        </div>
				<div class="e2_wrap">
					<img class="e2"
							 src="<?php echo $content_url; ?>/uploads/e2.png"
							 alt=" " />
				</div>
				<div class="o1_wrap">
					<img class="o1"
							 src="<?php echo $content_url; ?>/uploads/o1.png"
							 alt=" " />
				</div>
				<div class="r2_wrap">
					<img class="r2"
					     src="<?php echo $content_url; ?>/uploads/r2.png"
							 alt=" " />
				</div>
			</figure>
			
			<div class="studio_heading">
				<div class="studio_heading_ratio_fix"></div>
				<figure class="studio_heading_wrap">
					<div class="s_wrap">
						<img class="s_wrap"
						     src="<?php echo $content_url; ?>/uploads/s.png"
								 alt="studio" />
          </div>
					<div class="t2_wrap">
						<img class="t2"
								 src="<?php echo $content_url; ?>/uploads/t2.png"
								 alt=" " />
					</div>
					<div class="u_wrap">
						<img class="u"
						     src="<?php echo $content_url; ?>/uploads/u.png"
								 alt=" " />
					</div>
					<div class="d_wrap">
						<img class="d"
						     src="<?php echo $content_url; ?>/uploads/d.png"
								 alt=" " />
					</div>
					<div class="i_wrap">
						<img class="i"
						     src="<?php echo $content_url; ?>/uploads/i.png"
								 alt=" " />
					</div>
					<div class="o2_wrap">
						<img class="o2"
						     src="<?php echo $content_url; ?>/uploads/o2.png"
								 alt=" " />
					</div>
				</figure>
			</div>
			
		</h1>

		<figure class="hero">
			<div class="logo_ratio_fix"></div>
			<div class="logo_wrap">
				<img class="logo logo_animate"
				     id="logo" src="<?php echo $content_url; ?>/uploads/guy.png"
						 alt="an astronaut floating in space" />
			</div>
		</figure>
		
		<figure class="load_meter_wrap">
		</figure>
		
		<p class="to_enter_wrap">
			<a class="to_enter ghost"
			   id="to_enter"
				 href="<?php echo $animation_url; ?>">
				<img class="flash"
				     id="flash_left"
						 alt=" "
						 src="<?php echo $style_sheet_dir; ?>/style_imgs/flash_left.png" />
				enter
				<img class="flash"
				     id="flash_right"
						 alt=" "
						 src="<?php echo $style_sheet_dir; ?>/style_imgs/flash_right.png" />
			</a>
		</p>
	</section>
<?php get_footer(); ?>