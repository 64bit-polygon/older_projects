<script>if( document.URL.indexOf('feedback') !== -1 ){var _url = document.URL;document.location.href = _url.substring(0, _url.indexOf('feedback')) + 'contact/';}</script>
<?php get_header(); ?>
	<section class="feedback_wrap"
	         role="main">
	  <article class="feedback_content">
			
			<h3 class="success_fail_output">
				<span class="sent"><?php the_field( sent_opener ); ?></span>
				<span class="sent"><?php the_field( sent_notification ); ?></span>
				<span class="failed"><?php the_field( failed_opener ); ?></span>
				<span class="failed"><?php the_field( failed_notification ); ?></span>
			</h3>
			
			<ul class="error_list failed">
				<li class="failed_email failed"><?php the_field( failed_email ); ?></li>
				<li class="failed_message failed"><?php the_field( failed_message ); ?></li>
			</ul>
			
			<p class="feedback_instructions">
				<span class="failed"><?php the_field( failed_plea ); ?></span>
				<span class="sent"><?php the_field( success_plea ); ?></span>
			</p>
			
			<p class="back_to_contact_wrap failed">
				<a href="<?php echo get_page_link( get_page_by_title( 'contact' )->ID ); ?>"
					 class="back_to_contact ghost" ></a>
        <img class="back_to_contact_text replaced_img"
				     src="<?php echo content_url(); ?>/uploads/replaced.gif"
						 alt="back" />
	    </p>
		</article>
	</section>
<?php get_footer(); ?>
