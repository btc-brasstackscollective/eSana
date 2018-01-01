<?php
	
namespace App\Controllers;

class ContactController
{
	protected $view;
	
	public function __construct(\Slim\Views\Twig $view) {
        $this->view = $view;
    }
    public function send($request, $response, $args) {
	    $params = $request->getParsedBody(); 
	    
	    $recipient = 'info@esanahealth.com';
	    
		$headers = 'From: '. $params['email'] . "\r\n" . 
			'Reply-To: '. $params['email'] . "\r\n" .
		    'X-Mailer: PHP/' . phpversion();
			
		$subject = $params['subject'];
			
		$body = $params['message'];
			
		$success = mail($recipient, $subject, $body, $headers);
		
		if (!$success) {
		    $errorMessage = error_get_last()['message'];
		    return $errorMessage;
		}
		
		return $success;
    }
    
    // Email Customer Lead to the eSana Health Sales Team
    public function inquiry_send($request, $response, $args) {
	    $params = $request->getParsedBody(); 
	    
	    $recipient = 'bill@esanahealth.com';
	    
		$headers = 'From: '. $params['esana_health_email_address'] . "\r\n" . 
			'Reply-To: '. $params['esana_health_email_address'] . "\r\n" .
		    'X-Mailer: PHP/' . phpversion();
			
		$subject = "eSana Health : Customer Inquiry";
			
		$body = 'Lead'.
		"\r\n\n".
		'Name: '.$params['esana_health_first_name'].' '.$params['esana_health_last_name'].
		"\r\n".
		'Email Address: '.$params['esana_health_email_address'].
		"\r\n".
		'Phone Number: '.$params['esana_health_phone_number'].
		"\r\n\n";
			
		$success = mail($recipient, $subject, $body, $headers);
		
		if (!$success) {
		    $errorMessage = error_get_last()['message'];
		    return $errorMessage;
		}
		
		return $success;
    }
}