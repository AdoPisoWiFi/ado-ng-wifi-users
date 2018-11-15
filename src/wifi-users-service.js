
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

