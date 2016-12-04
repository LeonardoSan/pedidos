angular.module('starter.controllers', ['ionic.cloud'])

.controller('AppCtrl', function($scope, $ionicAuth, $ionicUser, $ionicPopup, $state) {

  $scope.loginData = {};
  $scope.username = $ionicUser.details.username;

  $scope.doLogin = function() {
    $ionicAuth.login('basic', $scope.loginData)
      .then(function(resp) {
        console.log('login ok', resp);
        $state.go('app.restaurant', null, { reload: true });
      })
      .catch(function(error) {
        console.error(error);
        showAlert();
      });
  };

  var showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: 'Ocurrió un error al iniciar sesión'
    });
  };

  $scope.isAuthenticated = function() {
    if ($ionicAuth.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  };

  $scope.logout = function() {
    $ionicAuth.logout();
    $state.go('app.login', null, { reload: true });
  };


})

.controller('RestaurantCtrl', function($scope, DatabaseService, $ionicPopup) {

  $scope.viewNewClient = false;
  $scope.newClient = {
    name: ''
  };

  DatabaseService.getList('clients').$loaded()
    .then(function(resp) {
      $scope.clients = resp;
    })
    .catch(function(error) {
      console.error(error);
    });

  $scope.validate = function() {
    if ($scope.newClient.name === '') {
      showAlert();
    } else {
      DatabaseService.create($scope.newClient, 'clients')
        .then(function(resp) {
          $scope.viewNewClient = false;
          $scope.newClient = {
            name: ''
          };
        })
        .catch(function() {
          console.error(error);
        });
    }
  };

  $scope.onViewNewClient = function() {
    $scope.viewNewClient = true;
  };

  var showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Adventencia',
      template: 'Para guardar debe escribir un nombre de cliente'
    });
  };

})

.controller('ProductsCtrl', function($scope, DatabaseService, $ionicPopup) {
  $scope.viewNewProduct = false;
  $scope.newProduct = {
    name: '',
    value: null,
    obsernations: ''
  };

  DatabaseService.getList('products').$loaded()
    .then(function(resp) {
      $scope.products = resp;
    })
    .catch(function(error) {
      console.error(error);
    });

  $scope.validate = function() {
    if ($scope.newProduct.name === '') {
      showAlertName();
    } else if ($scope.newProduct.value === null || $scope.newProduct.name < 1) {
      showAlertValue();
    } else {
      DatabaseService.create($scope.newProduct, 'products')
        .then(function(resp) {
          $scope.viewNewProduct = false;
          $scope.newProduct = {
            name: '',
            value: null,
            obsernations: ''
          };
        })
        .catch(function() {
          console.error(error);
        });
    }
  };

  $scope.onViewNewProduct = function() {
    $scope.viewNewProduct = true;
  };

  var showAlertName = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Adventencia',
      template: 'Para guardar debe escribir un nombre de producto'
    });
  };

  var showAlertValue = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Adventencia',
      template: 'Para guardar debe escribir un precio de producto válido'
    });
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {});
