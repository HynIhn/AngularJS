var app = angular.module("myApp", ["ngRoute"]);
app.controller("myCtrl", function ($scope, $rootScope, $routeParams, $http) {

  $scope.products = [];
  //Đọc dữ liệu từ file json
  $http.get("data.json").then(function (response) {
    $scope.products = response.data;
    for (i = 0; i < $scope.products.length; i++) {
      if ($scope.products[i].id == $routeParams.id) {
        $scope.index = i;
      }
    }
    //Khúc này là chuyển từ id để lấy sản phẩm 
    $scope.detailPro = $scope.products.find(item => item.id == $routeParams.id);
  });
  $rootScope.tim = function (input) {
    $rootScope.key = input;
  };
  //Thêm sản phẩm vào giỏ hàng 
  //Tăng giảm giỏ hàng

  $scope.sort = 'price';
  $scope.tang = function () {
    $scope.sort = 'price';
  }
  $scope.giam = function () {
    $scope.sort = '-price';
  }
  $scope.addCart = function (product) {
    //Kiểm tra giỏ hàng đã có chưa, chưa thì khai báo
    if (typeof $rootScope.cart === 'undefined') {
      $rootScope.cart = [];
    }
    
    //Kiểm tra sản phẩm đã có trong giỏ chưa?
    var index = $rootScope.cart.findIndex((item) => item.id == product.id);
    if (index == -1) {
      //Nếu ch có thì thêm mới
      product.quantity = 1;
      $rootScope.cart.push(product);
      $('#successModal').modal('show');
    } else {
      //Nếu có r thì tăng số lượng
      $rootScope.cart[index].quantity++;
    }
    console.log($rootScope.cart);
  };
  $scope.removeCart = function (product) {
    console.log('Before removal:', $rootScope.cart);
    if ($rootScope.cart && $rootScope.cart.length > 0) {
      var index = $rootScope.cart.findIndex((item) => item.id == product.id);
      $rootScope.cart.splice(index, 1);
    }
  };
  //Tính tổng giỏ hàng
  $scope.getTotalPrice = function () {
    var totalPrice = 0;
    if ($rootScope.cart) {
      $rootScope.cart.forEach(function (product) {
        totalPrice += product.sale * product.quantity;
      });
    }
    return totalPrice;
  };
  $scope.page = 1;
  $scope.limit = 4;
  $scope.start = ($scope.page - 1)* $scope.limit;
  $scope.tongTrang = Math.ceil($scope.products.length / $scope.limit);
  $scope.dsTrang = [];
  for (var i = 1; i <= $scope.tongTrang; i++){
    $scope.dsTrang.push(i);
  }
  $scope.chontrang = function(trang){
    $scope.page = trang;
    $scope.start = ($scope.page - 1) * $scope.limit;
  };

  // Thông tin giả mạo người dùng (nên lưu trữ an toàn trên server)
  var vm = this;
            var mockUserData = [
                { username: 'user1', password: 'pass1' },
                { username: 'user2', password: 'pass2' },
                // Thêm các tài khoản người dùng khác nếu cần
            ];

            vm.login = function() {
                var foundUser = mockUserData.find(function(user) {
                    return user.username === vm.username && user.password === vm.password;
                });

                if (foundUser) {
                    alert('Đăng nhập thành công');
                } else {
                    vm.errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.';
                }
            };
            $scope.countries=['Việt Nam','Mỹ','Trung Quốc','Khác'];
            $scope.nations=['Kinh','Thái','Kherme','Khác']
        
}
);



app.config(function ($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "home.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/DuLichTrongNuoc", {
      templateUrl: "DuLichTrongNuoc.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/detail/:id", {
      templateUrl: "ChiTiet.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/shopping", {
      templateUrl: "shopping.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/LogIn2", {
      templateUrl: "LogIn2.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/LogIn", {
      templateUrl: "LogIn.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/HotLine", {
      templateUrl: "HotLine.html?" + Math.random(),
      controller: "myCtrl",
    })
    // .when("/ChiTiet", {
    //   templateUrl: "ChiTiet.html?" + Math.random(),
    //   controller: "myCtrl",
    // })
    .otherwise({
      templateUrl: "home.html",
      controller: "myCtrl",
    });
});



