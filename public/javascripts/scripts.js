var app = window.angular.module('app', []);

app.factory('imageFetcher', imageFetcher);
app.factory('counterFetcher', counterFetcher);
app.factory('currentImageFetcher', currentImageFetcher);
app.controller('mainCtrl', mainCtrl);
//app.controller('battleCtrl', battleCtrl)

function imageFetcher($http) {

  var API_ROOT = "images";
  return {
    get: function() {
      return $http
        .get(API_ROOT)
        .then(function(resp) {
          return resp.data;
        });
    }
  };
}

function counterFetcher($http) {
  var API_ROOT = "counter";
  return {
    get: function() {
      return $http
        .get(API_ROOT)
        .then(function(resp) {
          return resp.data;
        });
    }
  };
}

function currentImageFetcher($http) {
  var API_ROOT = "currentimage";
  return {
    get: function() {
      return $http
        .get(API_ROOT)
        .then(function(resp) {
          return resp.data;
        });
    }
  };
}

function mainCtrl($scope, imageFetcher, currentImageFetcher, counterFetcher, $http) {

  $scope.scavengerImages = [];
  $scope.FoundImage;
  //Make counter get info from db
  $scope.counter = [];
  //$scope.counter.getCounter();
  // imageFetcher.get()
  //   .then(function(data) {
  //     $scope.scavengerImages = data;
  //   });
  currentImageFetcher.get().then(function(data) {
    $scope.FoundImage = data;
  });

  counterFetcher.get()
    .then(function(data) {
      $scope.counter = data;
    });

  $scope.incrementYes = function() {
    if ($scope.counter[0].yes == 4) {
      $scope.getRandomPhoto();
    }
    $http.put('/counter/yes')
      .success(function(data) {
        $scope.counter = data;
      });
  };

  $scope.incrementNo = function() {
    if ($scope.counter[0].no == 4) {
      $scope.getRandomPhoto();
    }
    $http.put('/counter/no')
      .success(function(data) {
        $scope.counter = data;
      });
  };

  $scope.getRandomPhoto = function() {
    imageFetcher.get()
      .then(function(data) {
        $scope.scavengerImages = data;
        var m = $scope.scavengerImages.length;
        if (m > 0) {
          var foundImage = $scope.scavengerImages[Math.floor(Math.random() * m)];
          var str = foundImage.path;
          var n = str.indexOf('/');
          var result = str.substring(n + 1);
          $scope.FoundImage = result;
         var request = { curImage: result};
          $http.post('/currentimage', request)
            .success(function(data) {
              $scope.FoundImage = data;
            });
        }
      });
  };
}
