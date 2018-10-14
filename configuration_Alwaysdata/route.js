

var app = angular.module('sa_app', ['ngRoute','auth0.auth0','angular-jwt']);


  app.run(function (authService) {

    authService.handleAuthentication();
  });



app.config(function($routeProvider,angularAuth0Provider,$locationProvider){


  angularAuth0Provider.init({ // il faut mettre les données de votre compte Auth0 ici
    clientID :'32P1fxaWxVfoag0kAgCqfPuixeQqwuV6',
    domain : 'ghailene.auth0.com',
    responseType : 'token id_token',
    redirectUri : 'http://localhost/configuration_Alwaysdata/',
    scope : 'openid profile',
    audience: 'https://ghailene.com/api'
  });

  $routeProvider
	.when('/', {
    templateUrl: 'views/client.html',
    controller : 'controller'


	})
  .when('/formules', {
    templateUrl: 'views/formule.html',
    controller : 'controller'
  })
  .when('/offres', {
    templateUrl: 'views/offre.html',
    controller : 'controller'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller : 'controller'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller : 'loginController'
  })
	.otherwise({
		redirectTo: '/'
	});




});
