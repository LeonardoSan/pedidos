// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.cloud', 'firebase', 'starter.controllers'])

.config(function($ionicCloudProvider) {
	$ionicCloudProvider.init({
		"core": {
			"app_id": "174a8ec0"
		}
	});
})

.config(function() {
	var config = {
		apiKey: "AIzaSyD5LQ1hou0VNy63dFRCTFLia9MoAdjUlrE",
		authDomain: "pedidos-93e1c.firebaseapp.com",
		databaseURL: "https://pedidos-93e1c.firebaseio.com/",
		storageBucket: "pedidos-93e1c.appspot.com",
	};
	firebase.initializeApp(config);
})

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

		.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})

	.state('app.login', {
		url: '/login',
		views: {
			'menuContent': {
				templateUrl: 'templates/login.html'
			}
		}
	})

	.state('app.restaurant', {
		url: '/restaurant',
		views: {
			'menuContent': {
				templateUrl: 'templates/restaurant.html',
				controller: 'RestaurantCtrl'
			}
		}
	})

		.state('app.products', {
			url: '/products',
			views: {
				'menuContent': {
					templateUrl: 'templates/products.html',
					controller: 'ProductsCtrl'
				}
			}
		});

	$urlRouterProvider.otherwise('/app/login');
})

.factory('DatabaseService',function($q, $firebaseObject, $firebaseArray){
    var databaseService = {};
    var ref = null;

    databaseService.getRef = function(){
      ref = ref? ref: firebase.database().ref().child('client-test');
      return ref;
    };

    databaseService.getList = function(doc_name){
      var ref = databaseService.getRef().child(doc_name);
      return $firebaseArray(ref);
    };

    databaseService.create = function(record, doc_name){
      var ref = databaseService.getRef().child(doc_name);
      var list = $firebaseArray(ref);
      return list.$add(record);
    };

    return databaseService;
});