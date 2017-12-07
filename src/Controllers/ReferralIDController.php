<?php
	
namespace App\Controllers;

use Slim\Views\Twig;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Query\Builder;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class ReferralIDController
{
	private $view;
	private $logger;
	protected $table;
	
	public function __construct(
		Twig $view,
		LoggerInterface $logger,
		Builder $table
	) {
        $this->view = $view;
        $this->logger = $logger;
        $this->table = $table;
    }
    
    public function __invoke(Request $request, Response $response, $args)
    {
	    
    }
    
    // Add User ID
    public function createUserID(Request $request, Response $response, $args)
    {
	    $referralID = $request->getAttribute('referralid');
	    $userID = $request->getAttribute('userid');
	    
	    $referralUpdateUserIDTbl = $this->table->where('esana_referral_id', $referralID)->update(['esana_user_id' => $userID, 'date_user_id_added' => date('Y-m-d H:i:s')]);

	    return $referralUpdateUserIDTbl;
    }
    
    // Delete Referral ID
    public function deleteReferralID(Request $request, Response $response, $args)
    {
	    $referralID = $request->getAttribute('referralid'); 
	    
	    $referralDeleteTbl = $this->table->where('esana_referral_id', $referralID)->where('referral_id_sent', '!=', '1')->delete();
	    
	    return $referralDeleteTbl;
    }
}