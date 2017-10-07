<?php
// DIC configuration

$container = $app->getContainer();

// twig view
$container['view'] = function($c) {
	$settings = $c->get('settings')['renderer'];
	$view = new \Slim\Views\Twig($settings['template_path'], [
		'cache' => false
	]);
	
	return $view;
};

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};

$container['ContactController'] = function($c) {
    $view = $c->get("view"); // retrieve the 'view' from the container
    return new App\Controllers\ContactController($view);
};