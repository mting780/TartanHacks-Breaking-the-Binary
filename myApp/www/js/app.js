// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
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

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'GeoCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })


    .state('noMenu', {
      "url" : "/noMenu",
      abstract : true,
      templateUrl : "noMenuState.html"
    })

    .state("noMenu.simplePage", {
      "url" : "/simplePage",
      views : {
        "noMenuView" : {
          templateUrl : "simplePage"
        }
      }
    })


    .state("noMenu.simplePage2", {
      "url" : "/simplePage2",
      views : {
        "noMenuView" : {
          templateUrl : "simplePage2"
        }
      }
    })        
    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "main.html"
    })


    .state('app.state1', {
        url: "/state1",
        views: {
            'menuContent' :{
                templateUrl: "state-1-center.html",
            },
            'right-menu' : {
                templateUrl : "state-1-right.html"
            }
        }
    })

    .state('app.state2', {
        url: "/state2",
        views: {
            'menuContent' :{
                templateUrl: "state-2-center.html"
            },
            'right-menu' : {
                templateUrl : "state-2-right.html"
            }
        }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})
 .controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
        console.log('MainCtrl');

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
      
        $scope.data=["JavaScript","Java","Ruby","Python"];
    })

.directive('searchBar', [function () {
  return {
    scope: {
      ngModel: '='
    },
    require: ['^ionNavBar', '?ngModel'],
    restrict: 'E',
    replace: true,
    template: '<ion-nav-buttons side="right">'+
            '<div class="searchBar">'+
              '<div class="searchTxt" ng-show="ngModel.show">'+
                  '<div class="bgdiv"></div>'+
                  '<div class="bgtxt">'+
                    '<input type="text" placeholder="Enter Your Location" ng-model="ngModel.txt">'+
                  '</div>'+
                '</div>'+
                '<i class="icon placeholder-icon" ng-click="ngModel.txt=\'\';ngModel.show=!ngModel.show"></i>'+
            '</div>'+
          '</ion-nav-buttons>',
    
    compile: function (element, attrs) {
      var icon=attrs.icon
          || (ionic.Platform.isAndroid() && 'ion-android-search')
          || (ionic.Platform.isIOS()     && 'ion-ios7-search')
          || 'ion-search';
      angular.element(element[0].querySelector('.icon')).addClass(icon);
      
      return function($scope, $element, $attrs, ctrls) {
        var navBarCtrl = ctrls[0];
        $scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;
        
      };
    },
    controller: ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
      var title, definedClass;
      $scope.$watch('ngModel.show', function(showing, oldVal, scope) {
        if(showing!==oldVal) {
          if(showing) {
            if(!definedClass) {
              var numicons=$scope.navElement.children().length;
              angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons'+numicons);
            }
            
            title = $ionicNavBarDelegate.getTitle();
            $ionicNavBarDelegate.setTitle('');
          } else {
            $ionicNavBarDelegate.setTitle(title);
          }
        } else if (!title) {
          title = $ionicNavBarDelegate.getTitle();
        }
      });
    }]
  };
}])

