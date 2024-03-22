<?php
function email_feedback(){
   $email_bool = false;
   $subject_bool = false;
   $message_bool = false;
   $from = $_POST['from'];
   $to = $_POST['to'];
   $subject = $_POST['subject'];
   $message = $_POST['message'];
   if(preg_match('/^[_A-z0-9-]+((\.|\+)[_A-z0-9-]+)*@[A-z0-9-]+(\.[A-z0-9-]+)*(\.[A-z]{2,4})$/',$from)){
      $email_bool = true;
   }
   $subject = trim($subject);
   $subject_bool = (strlen($subject_bool) > 0);
   $message = trim($message);
   $message_bool = (strlen($message_bool) > 0);
   $message = 'from ' . $from . " : \n" . $message;
   if($email_bool && $subject_bool && $message_bool){
      mail( $to, $subject, $message, $headers, $from );
   }
}
?>