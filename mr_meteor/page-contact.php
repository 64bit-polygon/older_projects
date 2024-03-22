<?php
	get_header();
	$img_path = content_url() . '/uploads/replaced.gif';
	$feed_back_url = get_permalink( get_page_by_title( 'feedback' )->ID );
	$ajax_url = admin_url('admin-ajax.php');
	$admin_email = get_field( admin_email );
?>
<section class="contact_form_wrap"
         role="main">
	<form class="contact_form"
	      action="<?php echo $feed_back_url; ?>"
				data-ajax_action="<?php echo $ajax_url; ?>"
				method="post">
				
		<div class="from_wrap">
			<label for="from"
			       class="from_label"
						 id="from_label">
				<img class="colon_text" 
				     alt="from :" 
						 src="<?php echo $img_path; ?>" />
				<img class="arrow_label_icon"
				     alt=" " 
						 src="<?php echo $img_path; ?>" />
			</label>
			<input class="from_input_ghost js_ghost"
			       id="from_input_ghost"
						 inputmode="email"
						 autocomplete="off"
						 value="your email"
						 data-initial_val="your email" />
			<div id="from_input"
			     class="from_input"></div>
			<mark class="from_feedback feedback">
				input is feedback is <var class="var_false">incomplete</var>
			</mark>
		</div>
		
		<address class="to_wrap">
			<label for="to"
			       class="to_label"
						 id="to_label">
				<img alt="to :"
				     class="to_text" 
						 src="<?php echo $img_path; ?>" />
			</label>
			<samp class="to_input">skip@mrmeteor.net</samp>
			<input id="to"
			       name="admin_email"
						 autocomplete="off"
						 type="hidden"
						 value="<?php echo $admin_email; ?>" />
		</address>
		
		<div class="subject_wrap">
			<input class="subject_input_ghost js_ghost"
			       id="subject_input_ghost"
						 autocomplete="off"
						 type="text" 
						 value="subject line"
						 data-initial_val="subject line" />
			<div id="subject_input" 
			     class="subject_input"></div>
			<mark class="subject_feedback feedback">
				subject is <var class="var_false">incomplete</var>
			</mark>
		</div>
		
		<div class="message_wrap">
			<textarea class="email_message_ghost js_ghost"
			          id="email_message_ghost"
								autocomplete="off"
								data-initial_val="your message">your message</textarea>
		   <div class="email_message"
			      id="email_message"></div>
		   <mark class="message_feedback feedback">
				 feedback is <var class="var_false">incomplete</var>
			 </mark>
		</div>
		
		<dl class="progress">
		   <dt>status of your message:</dt>
		      <dd>
						your email <var class="progress_false">needs to be</var> entered
					</dd>
		      <dd>
						the subject line of your message <var class="progress_false">needs to be</var> entered
					</dd>
					<dd>
						your message <var class="progress_false">needs to be</var> entered
					</dd>
		</dl>
		
		<div class="email_wrap">
		   <button class="email_button ghost"
			         name="email_button"
							 data-btn="contact_send"
							 type="submit"></button>
		   <figure class="submit_text"></figure>
		</div>
		
	</form>
	<div id="contact_pop_up_wrap" class="hide_pop_up">
		<figure id="contact_pop_up" class="success">
			<p id="contact_success">Your email was sent.<br/>We'll be in touch.</p>
			<p id="error_no_email">Your email was not sent:<br/>Your email was not valid.</p>
			<p id="error_no_message">Your email was not sent:<br/>Your message was not valid.</p>
			<p id="error_no_email_or_message">Your email was not sent:<br/>Your email and your message were not valid.</p>
			<div class="okay_wrap">
				<button class="okay_button ghost"
								name="okay_button"
								type="button"></button>
				<figure class="okay_text"></figure>
			</div>
		</figure>
	</div>
</section>
<?php get_footer(); ?>