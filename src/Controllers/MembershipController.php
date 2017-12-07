<?php
	
namespace App\Controllers;

use Slim\Views\Twig;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class MembershipController
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
	    // Create new, random, unique referral ID					   
		$new_referral_id = $this->table->selectRaw('FLOOR(RAND() * 99999999) AS new_referral_id')
								   ->whereNotExists(function ($query) {
									   $query->select('esana_referral_id')
									         ->where('esana_referral_id', '=', 'new_referral_id')
									   		 ->from($this->table->from);
								   })
								   ->limit(1)
        						   ->get();
        
        // pull out the referral ID from the Array			   
        $args['referralID'] = $new_referral_id->toArray()[0]->new_referral_id;
        
        // insert the new referral ID into the DB
        $this->table->insert(
	        ['esana_referral_id' => $args['referralID'], 'date_created' => date('Y-m-d H:i:s')]
        );
        								  
        $this->view->render($response, 'membership.html.twig', $args);
    }
}