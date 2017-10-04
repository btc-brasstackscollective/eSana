<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

// Home Page
$app->get('/', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'home.html.twig', $args);
});

// Plans Page
$app->get('/plans', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'plans.html.twig', $args);
});

// Tools Page
$app->get('/tools', function($request, $response, array $args) {
	$args['currentUrl'] = $request->getUri()->getPath();
	return $this->view->render($response, 'tools.html.twig', $args);
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

$app->post('/contact-submit', \src\Controllers\ContactController::class . ':send');