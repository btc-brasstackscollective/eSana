<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

// Home Page
$app->get('/', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'home.html.twig', $args);
});

// Membership Page
/*$app->get('/membership', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'membership.html.twig', $args);
});*/

$app->get('/membership', 'MembershipController');

// Savings Page
$app->get('/savings', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'savings.html.twig', $args);
});

// Tools Page
$app->get('/tools', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'tools.html.twig', $args);
});

// Tools Page
$app->get('/tools/savings-calculator', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'tools_savings_calculator.html.twig', $args);
});

// Mission Page
$app->get('/mission', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'mission.html.twig', $args);
});

// Contact Page
$app->get('/contact', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'contact.html.twig', $args);
});

// Privacy Policy
$app->get('/privacy-policy', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'privacy.html.twig', $args);
});

// FAQs
$app->get('/faqs', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'faqs.html.twig', $args);
});

$app->post('/contact-submit', 'ContactController:send');

// create User ID for Referral ID
$app->post('/api/referralid/{referralid}/userid/{userid}', 'ReferralIDController:createUserID');

// delete unused Referral ID entry
$app->post('/api/referralid/{referralid}/delete', 'ReferralIDController:deleteReferralID');

// Landing Pages
// MedPlus Prescription 1
$app->get('/landingpage/medplus/prescription', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'medplus_prescription_landing_page.html.twig', $args);
});

// MedPlus Prescription Form
$app->get('/landingpage/medplus/prescription/form', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'medplus_prescription_landing_page_form.html.twig', $args);
});

// MedPlus Telemedicine 1
$app->get('/landingpage/medplus/telemedicine', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'medplus_telemedicine_landing_page.html.twig', $args);
});

// MedPlus Telemedicine Form
$app->get('/landingpage/medplus/telemedicine/form', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'medplus_telemedicine_landing_page_form.html.twig', $args);
});

// Dental Option 1
$app->get('/landingpage/dental', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'dental_landing_page.html.twig', $args);
});

// Dental Option Form
$app->get('/landingpage/dental/form', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'dental_landing_page_form.html.twig', $args);
});