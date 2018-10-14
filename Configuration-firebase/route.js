var app = angular.module('sa_app', ['ngRoute', 'firebase']);

app.config(function($routeProvider){
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
	.otherwise({
		redirectTo: '/'
	});
});
