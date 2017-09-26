<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

// Home Page
$app->get('/', function($request, $response) {
	return $this->view->render($response, 'home.html.twig');
});

// Plans Page
$app->get('/plans', function($request, $response) {
	return $this->view->render($response, 'plans.html.twig');
});

// Tools Page
$app->get('/tools', function($request, $response) {
	return $this->view->render($response, 'tools.html.twig');
});

// Mission Page
$app->get('/mission', function($request, $response) {
	return $this->view->render($response, 'mission.html.twig');
});

// Contact Page
$app->get('/contact', function($request, $response) {
	return $this->view->render($response, 'contact.html.twig');
});