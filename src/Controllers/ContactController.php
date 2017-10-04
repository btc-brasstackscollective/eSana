class ContactController
{
	protected $view;
	
	public function __construct(\Slim\Views\Twig $view) {
        $this->view = $view;
    }
    public function send($request, $response, $args) {
	    //$recipient = 'info@esanahealth.com';
	    $recipient = 'dougingalls@gmail.com';
	    
		$headers = 'From: '. $args['email'] .' . "\r\n" .
		    'Reply-To: '. $args['email'] .' . "\r\n" .
		    'X-Mailer: PHP/' . phpversion();
			
		$subject = $args['subject'];
			
		$body = $args['message'];
			
		$success = mail($recipient, $subject, $body, $headers);
			
		if (!$success) {
		    $errorMessage = error_get_last()['message'];
		    echo $errorMessage;
		}
		
		return $response;
    }
}