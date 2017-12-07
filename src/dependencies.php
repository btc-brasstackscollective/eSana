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

// Service factory for the ORM
$container['db'] = function ($container) {
    $capsule = new \Illuminate\Database\Capsule\Manager;
    $capsule->addConnection($container['settings']['db']);

    $capsule->setAsGlobal();
    $capsule->bootEloquent();

    return $capsule;
};

// Controller Classes
$container['MembershipController'] = function($c) {
    $view = $c->get("view"); // retrieve the 'view' from the container
    $logger = $c->get('logger');
    $table = $c->get('db')->table('esana_referral');
    return new App\Controllers\MembershipController($view, $logger, $table);
};

$container['ContactController'] = function($c) {
    $view = $c->get("view"); // retrieve the 'view' from the container
    return new App\Controllers\ContactController($view);
};

$container['ReferralIDController'] = function ($c) {
    $view = $c->get('view');
    $logger = $c->get('logger');
    $table = $c->get('db')->table('esana_referral');
    return new App\Controllers\ReferralIDController($view, $logger, $table);
};