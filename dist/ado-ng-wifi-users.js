angular.module('ado-ng-wifi-users.tpls', []).run(['$templateCache', function($templateCache) {$templateCache.put('./wifi-users.html','<div class="wifi-users">\n\n  <div uib-tabset active="active">\n    <div uib-tab index="0" heading="Connected Users">\n\n      <div class="padd-top">\n\n        <div\n          ba-panel\n          ba-panel-title="Number of Users: {{$ctrl.clients.length}}"\n          ba-panel-class="with-scroll">\n\n          <div class="row">\n            <div class="col-md-3">\n              <div class="padd-bottom">\n                <a class="btn btn-warning" ng-click="$ctrl.reloadClients()" ng-disabled="refreshing">\n                  <i class="glyphicon glyphicon-refresh"></i>\n                  {{$ctrl.refreshing? \'Refrishing List...\' : \'Refresh List\'}}\n                </a>\n              </div>\n            </div>\n\n            <div class="col-md-3">\n              <form class="form-inline">\n                <label>Sort By:</label> \n                <select class="form-control" ng-model="$ctrl.sortAttr">\n                  <option value="remaining_time">Remaing Time</option>\n                  <option value="status">Status</option>\n                  <option value="hostname">Hostname</option>\n                  <option value="ip_address">IP Address</option>\n                  <option value="bandwidth_down">Max Download</option>\n                  <option value="bandwidth_up">Max Upload</option>\n                </select>\n              </form>\n            </div>\n\n            <div class="col-md-6">\n              <form class="form-inline">\n                <div class="input-group">\n                  <span class="input-group-addon input-group-addon-primary addon-left" id="basic-addon1">\n                    <i class="ion-ios-search-strong"></i>\n                  </span>\n                  <input type="text" ng-model="$ctrl.searchText" class="form-control with-primary-addon" placeholder="Search users by hostname/mac/ip" aria-describedby="basic-addon1">\n                </div>\n              </form>\n            </div>\n          </div>\n\n\n          <p ng-if="!$ctrl.clients || $ctrl.clients.length == 0">\n          No clients to show. Refresh to see list.\n          </p>\n\n          <table class="table table-bordered" ng-show="$ctrl.clients && $ctrl.clients.length > 0">\n            <thead>\n              <th>\n                Hostname\n              </th>\n              <th>\n                <span class="hidden-md hidden-lg">IP</span>\n                <span class="hidden-xs hidden-sm">IP Address</span>\n              </th>\n              <th>\n                <span class="hidden-md hidden-lg">MAC</span>\n                <span class="hidden-xs hidden-sm">MAC Address</span>\n              </th>\n              <th>Status</th>\n              <th>\n                <span class="hidden-md hidden-lg">Time</span>\n                <span class="hidden-xs hidden-sm">Remaining Time</span>\n              </th>\n              <th>Max Download</th>\n              <th>Max Upload</th>\n              <th>Token</th>\n              <th>\n                Action\n              </th>\n            </thead>\n            <tbody>\n              <tr ng-repeat="c in $ctrl.clients | filter:$ctrl.searchText | orderBy:$ctrl.sortAttr">\n                <td>{{c.hostname}}</td>\n                <td>{{c.ip_address || \'unreachable\'}}</td>\n                <td>{{c.mac_address}}</td>\n                <td>{{c.remaining_time > 0 ? (c.status === \'connected\' ? (c.ip_address? \'connected\' : \'disconnected\') : \'paused\' ): \'disconnected\'}}</td>\n                <td>{{c.remaining_time | datetimeToNow:\'short\'}}</td>\n                <td>{{c.bandwidth_down}}kbps</td>\n                <td>{{c.bandwidth_up}}kbps</td>\n                <!--<td>-->\n                <!--  <span ng-style="{color: c.cookie_auth? \'inherit\' : \'gray\'}">-->\n                <!--  {{c.cookie_auth? "ON" : "OFF"}}-->\n                <!--  </span>-->\n                <!--</td>-->\n                <td>\n                  <span ng-style="{color: c.cookie_auth? \'inherit\' : \'gray\'}">\n                    {{c.token}}\n                  </span>\n                </td>\n                <td>\n                  <button edit-customer-time ng-model="c" class="btn btn-primary btn-xs">\n                    <i class="glyphicon glyphicon-pencil"></i>\n                    Edit\n                  </button>\n                  <button ng-click="$ctrl.blockUser(c.mac_address)" class="btn btn-danger btn-xs">\n                    <i class="glyphicon glyphicon-ban-circle"></i>\n                    Block\n                  </button>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n      </div>\n    </div>\n\n    <div uib-tab index="1" heading="Blocked Users">\n\n      <div class="padd-top">\n\n        <div\n          ba-panel\n          ba-panel-title="Blocked Users (MAC Filter)"\n          ba-panel-class="with-scroll">\n\n          <table class="table table-striped">\n            <thead>\n              <th>MAC Address</th>\n              <th>Options</th>\n            </thead>\n            <tbody>\n              <tr ng-show="$ctrl.blockListed.length === 0">\n                <td colspan="2">No blocked user yet.</td>\n              </tr>\n              <tr ng-repeat="mac in $ctrl.blockListed">\n                <td>{{mac}}</td>\n                <td>\n                  <button ng-click="$ctrl.unblockUser(mac)" class="btn btn-warning btn-xs">\n                    Unblock\n                  </button>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n      </div>\n    </div>\n  </div>\n\n</div>\n\n');}]);
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



angular
  .module('ado.wifi-users')
  .provider('adoWifiUsersService', function () {

    var provider = {};
    var globalConfig = {
      index_url: '/settings/clients',   // index
      update_url: '/settings/client/update',  // update single user
      get_blocked_url: '/device/wifi/blocked',
      block_url: '/device/wifi/block',    // block a user
      unblock_url: '/device/wifi/unblock',  // unblock a user
      reset_time_url: '/settings/time/reset',
      reconnect_url: '/settings/client/reconnect'
    };

    provider.set = function set(config) {
      angular.extend(globalConfig, config);
    };

    provider.$get = [
      '$http',
      function adoWifiUsersService($http) {

        this.fetch = function () {
          return $http.get(globalConfig.index_url);
        };

        this.updateClient = function (data) {
          return $http.post(globalConfig.update_url, data);
        };

        this.getBlocked = function() {
          return $http.get(globalConfig.get_blocked_url);
        };

        this.block = function (mac) {
          return $http.post(globalConfig.block_url, {mac: mac});
        };

        this.unblock = function (mac) {
          return $http.post(globalConfig.unblock_url, {mac: mac});
        };

        this.resetTime = function (mac) {
          return $http.post(globalConfig.reset_time_url, {mac: mac});
        };

        this.reconnect = function (mac) {
          return $http.post(globalConfig.reconnect_url, {mac: mac});
        };

        return this;
      }
    ];

    return provider;

  });

