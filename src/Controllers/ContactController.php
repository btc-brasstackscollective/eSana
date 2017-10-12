<?php
	
namespace App\Controllers;

class ContactController
{
	protected $view;
	
	public function __construct(\Slim\Views\Twig $view) {
        $this->view = $view;
    }
    public function send($request, $response, $args) {
	    //$recipient = 'info@esanahealth.com';
	    
	    $params = $request->getParsedBody(); 
	    
	    $recipient = 'info@brasstackscollective.com';
	    
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
}