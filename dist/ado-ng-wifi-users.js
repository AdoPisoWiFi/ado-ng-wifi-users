angular.module('ado-ng-wifi-users.tpls', []).run(['$templateCache', function($templateCache) {$templateCache.put('./wifi-users.html','<div class="wifi-users">\n\n  <div uib-tabset active="active">\n    <div uib-tab index="0" heading="Connected Users">\n\n      <div class="padd-top">\n\n        <div\n          ba-panel\n          ba-panel-title="Number of Users: {{$ctrl.clients.length}}"\n          ba-panel-class="with-scroll">\n\n          <div class="row">\n            <div class="col-md-3">\n              <div class="padd-bottom">\n                <a class="btn btn-warning" ng-click="$ctrl.reloadClients()" ng-disabled="refreshing">\n                  <i class="glyphicon glyphicon-refresh"></i>\n                  {{$ctrl.refreshing? \'Refrishing List...\' : \'Refresh List\'}}\n                </a>\n              </div>\n            </div>\n\n            <div class="col-md-3">\n              <form class="form-inline">\n                <label>Sort By:</label> \n                <select class="form-control" ng-model="$ctrl.sortAttr">\n                  <option value="remaining_time">Remaing Time</option>\n                  <option value="status">Status</option>\n                  <option value="hostname">Hostname</option>\n                  <option value="ip_address">IP Address</option>\n                  <option value="bandwidth_down">Max Download</option>\n                  <option value="bandwidth_up">Max Upload</option>\n                </select>\n              </form>\n            </div>\n\n            <div class="col-md-6">\n              <form class="form-inline">\n                <div class="input-group">\n                  <span class="input-group-addon input-group-addon-primary addon-left" id="basic-addon1">\n                    <i class="ion-ios-search-strong"></i>\n                  </span>\n                  <input type="text" ng-model="$ctrl.searchText" class="form-control with-primary-addon" placeholder="Search users by hostname/mac/ip" aria-describedby="basic-addon1">\n                </div>\n              </form>\n            </div>\n          </div>\n\n\n          <p ng-if="!$ctrl.clients || $ctrl.clients.length == 0">\n          No clients to show. Refresh to see list.\n          </p>\n\n          <table class="table table-bordered" ng-show="$ctrl.clients && $ctrl.clients.length > 0">\n            <thead>\n              <th>\n                Hostname\n              </th>\n              <th>\n                <span class="hidden-md hidden-lg">IP</span>\n                <span class="hidden-xs hidden-sm">IP Address</span>\n              </th>\n              <th>\n                <span class="hidden-md hidden-lg">MAC</span>\n                <span class="hidden-xs hidden-sm">MAC Address</span>\n              </th>\n              <th>Status</th>\n              <th>\n                <span class="hidden-md hidden-lg">Time</span>\n                <span class="hidden-xs hidden-sm">Remaining Time</span>\n              </th>\n              <th>Max Download</th>\n              <th>Max Upload</th>\n              <th>Token</th>\n              <th>\n                Action\n              </th>\n            </thead>\n            <tbody>\n              <tr ng-repeat="c in $ctrl.clients | filter:$ctrl.searchText | orderBy:$ctrl.sortAttr">\n                <td>{{c.hostname}}</td>\n                <td>{{c.ip_address || \'unreachable\'}}</td>\n                <td style="word-break: keep-all;">{{c.mac_address | macaddress}}</td>\n                <td>{{c.remaining_time > 0 ? (c.status === \'connected\' ? (c.ip_address? \'connected\' : \'disconnected\') : \'paused\' ): \'disconnected\'}}</td>\n                <td>{{c.remaining_time | datetimeToNow:\'short\'}}</td>\n                <td>{{c.bandwidth_down}}kbps</td>\n                <td>{{c.bandwidth_up}}kbps</td>\n                <!--<td>-->\n                <!--  <span ng-style="{color: c.cookie_auth? \'inherit\' : \'gray\'}">-->\n                <!--  {{c.cookie_auth? "ON" : "OFF"}}-->\n                <!--  </span>-->\n                <!--</td>-->\n                <td>\n                  <span ng-style="{color: c.cookie_auth? \'inherit\' : \'gray\'}">\n                    {{c.token}}\n                  </span>\n                </td>\n                <td>\n                  <button edit-customer-time ng-model="c" class="btn btn-primary btn-xs">\n                    <i class="glyphicon glyphicon-pencil"></i>\n                    Edit\n                  </button>\n                  <button ng-click="$ctrl.blockUser(c.mac_address)" class="btn btn-danger btn-xs">\n                    <i class="glyphicon glyphicon-ban-circle"></i>\n                    Block\n                  </button>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n      </div>\n    </div>\n\n    <div uib-tab index="1" heading="Blocked Users">\n\n      <div class="padd-top">\n\n        <div\n          ba-panel\n          ba-panel-title="Blocked Users (MAC Filter)"\n          ba-panel-class="with-scroll">\n\n          <table class="table table-striped">\n            <thead>\n              <th>MAC Address</th>\n              <th>Options</th>\n            </thead>\n            <tbody>\n              <tr ng-show="$ctrl.blockListed.length === 0">\n                <td colspan="2">No blocked user yet.</td>\n              </tr>\n              <tr ng-repeat="mac in $ctrl.blockListed">\n                <td style="word-break: keep-all;">{{mac | macaddress}}</td>\n                <td>\n                  <button ng-click="$ctrl.unblockUser(mac)" class="btn btn-warning btn-xs">\n                    Unblock\n                  </button>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n      </div>\n    </div>\n  </div>\n\n</div>\n\n');
$templateCache.put('./edit_customer_time_modal/edit_customer_time_modal.html','<form class="modal-content edit-customer-modal" name="addTimeForm">\n\n  <div class="modal-header text-center">\n    <button type="button" class="close" ng-click="$dismiss()" aria-label="Close">\n      <em class="ion-ios-close-empty sn-link-close"></em>\n    </button>\n    <h3 class="modal-title" id="myModalLabel">\n      Editing WiFi User\n    </h3>\n  </div>\n  <div class="modal-body">\n\n    <div class="form-group" ng-class="{\'has-error\': addTimeForm.hostname.$invalid}">\n      <label>Hostname</label>\n      <input class="form-control" type="text" ng-model="client.hostname" required name="hostname">\n    </div>\n\n    <h4>Add Time</h4>\n    <div class="form-group" ng-class="{\'has-error\' : addTimeForm.minutes.$invalid}">\n      <label>Minutes</label>\n      <input class="form-control" type="number" name="minutes" ng-model="minutes" required>\n      <span class="help-block" ng-if="addTimeForm.minutes.$error.required">Required.</span>\n    </div>\n\n    <div class="form-group" ng-class="{\'has-error\' : addTimeForm.hours.$invalid}">\n      <label>Hours</label>\n      <input class="form-control" type="number" ng-model="hours" name="hours" required>\n      <span class="help-block" ng-if="addTimeForm.hours.$error.required">Required.</span>\n    </div>\n\n    <div class="form-group" ng-class="{\'has-error\' : addTimeForm.days.$invalid}">\n      <label>Days</label>\n      <input class="form-control" type="number" ng-model="days" name="days" required>\n      <span class="help-block" ng-if="addTimeForm.days.$error.required">Required.</span>\n    </div>\n\n    <p>NOTE: You can input negative values (ex: -1) to subtract instead of adding time.</p>\n    <hr>\n    <h4>Pause Time</h4>\n    <div ng-class="{\'has-success\' : allow_pause}">\n      <div class="checkbox">\n        <label class="custom-checkbox">\n          <input type="checkbox" name="allow_pause" ng-model="allow_pause">\n          <span>\n            Allow user to pause remaining time?\n          </span>\n        </label>\n      </div>\n    </div>\n\n    <hr>\n    <h4>Cookie Authentication</h4>\n\n    <div ng-class="{\'has-success\' : cookie_auth}">\n      <div class="checkbox">\n        <label class="custom-checkbox">\n          <input type="checkbox" name="cookie_auth" ng-model="cookie_auth">\n          <span>\n            Enable cookie authentication?\n          </span>\n        </label>\n      </div>\n    </div>\n\n    <div ng-show="cookie_auth" ng-class="{\'has-success\' : cookie_transferrable}">\n      <div class="checkbox">\n        <label class="custom-checkbox">\n          <input type="checkbox" name="cookie_transferrable" ng-model="cookie_transferrable">\n          <span>\n            Allow user to use multiple browsers using Token?\n          </span>\n        </label>\n      </div>\n    </div>\n\n    <hr>\n    <h4>Time Transfer</h4>\n\n    <div ng-class="{\'has-success\' : cookie_sharable}">\n      <div class="checkbox">\n        <label class="custom-checkbox">\n          <input type="checkbox" name="cookie_sharable" ng-model="cookie_sharable">\n          <span>\n            Allow user to transfer remaining time to another device using Token?\n          </span>\n        </label>\n      </div>\n    </div>\n\n    <hr>\n    <h4>Change Bandwidth</h4>\n    <div class="form-group" ng-class="{\'has-error\' : addTimeForm.bandwidth_down.$invalid}">\n      <label>Bandwidth Down (kbps)</label>\n      <input class="form-control" type="number" ng-model="bandwidth_down" name="bandwidth_down" min="1" required>\n      <span class="help-block" ng-if="addTimeForm.bandwidth_down.$error.required">Required.</span>\n      <span class="help-block" ng-if="addTimeForm.bandwidth_down.$error.min">Minimum of 1 kbps.</span>\n    </div>\n\n    <div class="form-group" ng-class="{\'has-error\' : addTimeForm.bandwidth_up.$invalid}">\n      <label>Bandwidth Up (kbps)</label>\n      <input class="form-control" type="number" ng-model="bandwidth_up" name="bandwidth_up" min="1" required>\n      <span class="help-block" ng-if="addTimeForm.bandwidth_up.$error.required">Required.</span>\n      <span class="help-block" ng-if="addTimeForm.bandwidth_up.$error.min">Minimum of 1 kbps.</span>\n    </div>\n\n  </div>\n  <div class="modal-footer">\n    <button type="submit" ng-click="submit(totalTime())" class="btn btn-success" ng-disabled="addTimeForm.$invalid || addTimeForm.$pristine">Update</button>\n    <a class="btn btn-warning" ng-click="reset()" ng-disabled="client.remaining_time === 0">Clear Time</a>\n    <button type="button" class="btn btn-success" ng-disabled="!(client.status == \'disconnected\' && client.remaining_time > 0)" ng-click="reconnect()">Reconnect</button>\n    <a class="btn btn-default" ng-click="$dismiss()">Cancel</a>\n\n    <div ng-if="client.current_browser" class="text-left">\n      <hr>\n      <p>\n      <strong>Customer\'s browser:</strong>\n      {{client.current_browser}}\n      </p>\n    </div>\n\n  </div>\n\n</form>\n\n');}]);
(function () {
'use strict';

  var App = angular.module('ado.wifi-users', [
    'ado.macaddress-filter',
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
