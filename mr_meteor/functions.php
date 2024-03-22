<?php
add_filter('show_admin_bar', '__return_false');

function make_post_and_page_meta_arr(){
   $Cat_IDs = get_all_category_ids();
   $Page_IDs = get_all_page_ids();
   $l = count( $Cat_IDs );
   for( $i = 0; $i <= $l; $i++ ){
      $name = strtolower(get_cat_name( $Cat_IDs[$i] ));
      if( ($name == 'animation') ||($name == 'comics') || ($name == 'art') ){
         $Posts_Array = get_posts( array('posts_per_page' => -1, 'category' => 'cat_' . $Cat_IDs[$i]) );
         for( $j = 0; $j < count($Posts_Array); $j++ ){
            $Titles[] = $Posts_Array[$j]->post_title;
         }
         $Results[ $name ] = array(
            'nav_type' => 'archive',
            'the_titles' => $Titles,
            'title_tag' => get_field( 'win_title', 'category_' . $Cat_IDs[$i] ),
            'uri' => get_category_link( $Cat_IDs[$i] ) 
         );
      unset( $Titles );
      $Names[] = $name;
      }
   }
   
   $l = count( $Page_IDs );
   for( $i = 0; $i < $l; $i++ ){
      $name = get_the_title( $Page_IDs[$i] );
      $Results[ $name ] = array(
         'nav_type' => 'page',
         'the_titles' => '',
         'title_tag' => get_field( 'win_title', $Page_IDs[$i] ),
         'uri' => get_page_link( $Page_IDs[$i])
      );
      $Names[] = $name;
   }
   $Results['the_names'] = $Names;
   return $Results;
}

function localize_vars() {
   return array(
      'SITE_URL' => get_bloginfo('url'),
      'AJAX_URL' => admin_url('admin-ajax.php'),
      'AJAX_META' => make_post_and_page_meta_arr()
   );
}

function add_scripts() {
   $js_dir = get_template_directory_uri().'/js/';
	 
   wp_enqueue_script('modernizr', $js_dir . 'modernizr.js', false, '2.6.2', false);
	 
   wp_deregister_script('jquery');
   wp_enqueue_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', false, '1.10.2', true);
	 
	 wp_enqueue_script('local_jquery', $js_dir . 'no_internet_jquery.js', array('jquery'), '1.0.0', true);
	 
   wp_enqueue_script('plugins', $js_dir . 'plugins.js', array('jquery'), '1.0.0', true);
   //wp_enqueue_script('froogaloop', 'http://a.vimeocdn.com/js/froogaloop2.min.js', array('jquery', 'plugins'), '2.0.0', true);
   wp_enqueue_script('history_js', $js_dir . 'history_js/scripts/bundled/html4+html5/jquery.history.js', array('jquery', 'modernizr'), '1.0.0', true);
   wp_enqueue_script('my_script', $js_dir . 'script.js', array( 'jquery', 'modernizr', 'plugins', 'history_js' ), '1.0.0', true);
   wp_localize_script( 'my_script', 'AJAX_OB', localize_vars() );
}
add_action( 'wp_enqueue_scripts', 'add_scripts' );
	
function email_feedback() {
    if ( isset($_REQUEST) ) {
			$from = trim( $_REQUEST['from'] );
      $headers = 'From: ' . $from . "\r\n" .
                 'Reply-To: ' . $from . "\r\n" .
                 'X-Mailer: PHP/' . phpversion();
			
			$subject = trim( $_REQUEST['subject'] );
			$subject = ($subject == 'subject line' ? 'email received from mrm.net' : $subject . ' : sent via mrm.net');

      $message = trim( $_REQUEST['message'] );
			$message = ($message == 'your message' ? '' : $message);
      $message_bool = (strlen($message) > 0);
      $message = wordwrap($message, 70, "\r\n");
			
      $to = $_REQUEST['to'];
			
      $email_bool = filter_var($from, FILTER_VALIDATE_EMAIL);
			
      if($email_bool && $message_bool){
         mail( $to, $subject, $message, $headers );
      }
			
      $Results = array('email'=>$email_bool,
                       'message'=>$message_bool);
											 
      echo json_encode($Results);
    }
   die();
}
add_action( 'wp_ajax_email_feedback', 'email_feedback' );
add_action( 'wp_ajax_nopriv_email_feedback', 'email_feedback' );
?>
