angular.module('starter', ['ngCordova','ionic','ionic-ratings','ui.calendar','auth0','ionic-zoom-view'])
.run(function($ionicPlatform,$location,auth,$rootScope,StorageService) 
{
  auth.hookEvents();
  $ionicPlatform.ready(function() 
  {
      if(window.cordova && window.cordova.plugins.Keyboard) 
      {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) 
      {
        StatusBar.styleDefault();
      }
      var notificationOpenedCallback = function(jsonData) 
      {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal.startInit("c7338e8b-808a-4d26-a79d-b57c28dec360","1031404738817")
                    .handleNotificationOpened(notificationOpenedCallback)
                    .endInit();
      window.plugins.OneSignal.getIds(function(ids) 
      {
          var idonesignal = ids['userId'];
          StorageService.set('idonesignal',idonesignal);
      });
  });
  
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) 
  {
      var token   = StorageService.get('token');
      if (!token) 
      {
        $location.path('/auth/login');
      }
  });
})

.controller('AppCtrl', function($ionicPlatform,$ionicActionSheet,$window,$rootScope,$scope,$filter,$state,$ionicLoading,$timeout,$ionicHistory,StorageService) 
{
    $scope.tglskrg            = $filter('date')(new Date(),'yyyy-MM-dd');
    $scope.profile            = StorageService.get('profile');

    $scope.logout = function() 
    {
        $ionicActionSheet.show
        ({
          titleText: 'Are You Sure To Logout?',
          buttons: [
            { text: '<i class="icon ion-android-done-all"></i> Yes' }
          ],
          destructiveText: '<i class="icon ion-ios-undo-outline"></i> Cancel',
          buttonClicked: function(index) 
          {
            $ionicLoading.show({duration:1000});
            StorageService.destroy('profile');
            StorageService.destroy('token');
            $timeout(function () 
            {
                  $ionicLoading.hide();
                  $ionicHistory.clearCache();
                  $ionicHistory.clearHistory();
                  $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
                  $window.location.href = "index.html";
              }, 500);
          },
          destructiveButtonClicked: function() 
          {
            console.log('DESTRUCT');
            return true;
          }
        }); 
    };

    $ionicPlatform.registerBackButtonAction(function (event) 
    {
      if($state.current.name=="tab.dashboard")
      {
        navigator.app.exitApp();
      }
      else 
      {
        navigator.app.backHistory();
      }
    }, 100);
})

.controller('DashboardCtrl', function($scope) 
{
    var menus       = [];
    menus.push({src: "img/settings.png",link:"#/tab/setting",judul:"Setting"});
    $scope.menus = menus;
});
