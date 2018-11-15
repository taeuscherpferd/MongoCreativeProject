var app = window.angular.module('app', [])

app.factory('imageFetcher', imageFetcher)
app.factory('counterFetcher', counterFetcher)
app.controller('mainCtrl', mainCtrl)
//app.controller('battleCtrl', battleCtrl)

function imageFetcher($http) {

  var API_ROOT = "images"
  return {
    get: function() {
      return $http
        .get(API_ROOT)
        .then(function(resp) {
          return resp.data
        })
    }
  }

}

function counterFetcher($http) {
  var API_ROOT = "counter"
  return {
    get: function() {
      return $http
        .get(API_ROOT)
        .then(function(resp) {
          return resp.data
        })
    }
  }
}

function mainCtrl($scope, imageFetcher, counterFetcher, $http) {

  $scope.scavengerImages = [];
  //Make counter get info from db
  $scope.counter = [];
  //$scope.counter.getCounter();
  imageFetcher.get()
    .then(function(data) {
      $scope.scavengerImages = data;

    });

  counterFetcher.get()
    .then(function(data) {
      $scope.counter = data;

    });

  $scope.incrementYes = function() {
    $http.put('/counter')
      .success(function(data) {
        console.log("yes worked");
        $scope.counter[0].yes++;
      });
  };

  $scope.incrementNo = function() {
    $http.put('/counter')
      .success(function(data) {
        console.log("no worked");
        $scope.counter[0].no++;
      });
  };

  /* Function to shuffle array
   
     var shuffleArray = function(array) {
       var m = array.length;

       while (m) {
         var i = Math.floor(Math.random() * m--);
         var cat = array[m];
         array[m] = array[i];
         array[i] = cat;
       }

       return array;
     };
   */

}
