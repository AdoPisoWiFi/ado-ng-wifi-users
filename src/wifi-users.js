(function () {
'use strict';

  var App = angular.module('ado.wifi-users', [
    'ado-ng-wifi-users.tpls'
  ]);

  App.component('adoWifiUsers', {
    controller: 'AdoWifiUsersCtrl',
    templateUrl: './wifi-users.html'
  });

  App.controller('AdoWifiUsersCtrl', [
    '$scope',
    'adoConfigService',
    'adoWifiUsersService',
    '$window',
    'toastr',
    'httpError',
    function ($scope, adoConfigService, adoWifiUsersService, $window, toastr, httpError) {

      var $ctrl = this;

      $ctrl.sortAttr = 'remaining_time';
      $ctrl.refreshing = false;

      $ctrl.reloadClients = function () {
        $ctrl.refreshing = true;
        return adoWifiUsersService.fetch()
          .then(function (res) {
            $ctrl.clients = res.data;
          })
          .catch(function(res) {
            toastr.error(httpError(res));
          })
          .finally(function () {
            $ctrl.refreshing = false;
          });
      };

      $ctrl.reloadClients();

      $ctrl.reloadBlockedClients = function () {
        return adoWifiUsersService.getBlocked().then(function(res) {
          $ctrl.blockListed = res.data;
        });
      };

      $ctrl.reloadBlockedClients();

      $ctrl.blockUser = function (mac) {
        if ($window.confirm('Are you sure?')) {
          adoWifiUsersService.block(mac)
            .then(function(res) {
              $ctrl.reloadClients();
              $ctrl.reloadBlockedClients();
              toastr.success("Device has been blocked successfully.");
            })
            .catch(function (res) {
              toastr.error(httpError(res));
            });
        }
      };

      $ctrl.unblockUser = function (mac) {
        if ($window.confirm('Are you sure?')) {
          return adoWifiUsersService.unblock(mac)
            .then(function (res) {
              $ctrl.reloadBlockedClients();
              $ctrl.reloadClients();
              toastr.success("Device has been unblocked successfully.");
            })
            .catch(function (res) {
              toastr.error(httpError(res));
            });
        }
      };

    }]);

})();

