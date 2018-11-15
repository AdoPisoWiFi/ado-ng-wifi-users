(function () {
  'use strict';

  var App = angular.module('ado.wifi-users');

  App.directive('editCustomerTime', [
    '$uibModal',
    function ($uibModal) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, elem, attrs, ngModel) {

          $scope.$watch(function () {
            return ngModel.$modelValue;
          }, function (val) {
            console.log(val);
            $scope.client = val;
          });

          elem.on('click', function () {
            $uibModal.open({
              scope: $scope,
              controller: 'EditCustomerTimeCtrl',
              templateUrl: './edit_customer_time_modal/edit_customer_time_modal.html'
            })
              .result
              .then(function (data) {
                if (data) {
                  ngModel.$setViewValue(data);
                }
              });
            $scope.$apply();
          });
        }
      };
    }
  ]);

  App.controller('EditCustomerTimeCtrl', [
    '$scope',
    'toastr',
    'httpError',
    'adoWifiUsersService',
    '$uibModalInstance',
    function addTimeCtrl($scope, toastr, httpError, adoWifiUsersService, $uibModalInstance) {

      $scope.minutes = 0;
      $scope.hours = 0;
      $scope.days = 0;
      $scope.bandwidth_down = $scope.client.bandwidth_down;
      $scope.bandwidth_up = $scope.client.bandwidth_up;
      $scope.cookie_auth = $scope.client.cookie_auth;
      $scope.cookie_transferrable = $scope.client.cookie_transferrable;
      $scope.cookie_sharable = $scope.client.cookie_sharable;
      $scope.allow_pause = $scope.client.allow_pause;

      $scope.totalTime = function () {
        // convert to seconds
        var mins = $scope.minutes * 60;
        var hours = $scope.hours * 60 * 60;
        var days = $scope.days * 24 * 60 * 60;
        var total = mins + hours + days;
        return Math.round(total);
      };

      $scope.reset = function () {
        if (window.confirm('Are you sure?')) {
          adoWifiUsersService.resetTime($scope.client.mac_address)
            .then(function(res) {
              toastr.success($scope.client.hostname + "'s time successfully cleared");
              $uibModalInstance.close(res.data);
            })
            .catch(function(res) {
              toastr.error(httpError(res));
            });
        }
      };

      $scope.reconnect = function () {
        adoWifiUsersService.reconnect($scope.client.mac_address)
          .then(function (res) {
            $scope.client = res.data;
            toastr.success('Client successfully connected');
          })
          .catch(function(res) {
            toastr.error(httpError(res));
          });
      };

      $scope.submit = function (time) {
        var data = {
          mac_address: $scope.client.mac_address,
          hostname: $scope.client.hostname,
          ip_address: $scope.client.ip_address,
          time: time,
          bandwidth_down: $scope.bandwidth_down,
          bandwidth_up: $scope.bandwidth_up,
          cookie_auth: $scope.cookie_auth,
          cookie_transferrable: $scope.cookie_transferrable,
          cookie_sharable: $scope.cookie_sharable,
          allow_pause: $scope.allow_pause
        };
        adoWifiUsersService.updateClient(data)
          .then(function (res) {
            toastr.success($scope.client.hostname + "'s information successfully updated");
            $uibModalInstance.close(res.data);
          })
          .catch(function(res) {
            toastr.error(httpError(res));
          })
      };

    }
  ]);

})();
