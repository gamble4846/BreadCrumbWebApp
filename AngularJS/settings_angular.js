var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {

    $scope.SaveSettings = function(){
        localStorage.setItem('local_Script_Link', $scope.Settings_Script_Link);
        localStorage.setItem('local_Google_APIKey', $scope.Settings_Main_GoogleDriveAPIKEY);
    };

    $scope.init = function(){
        $scope.Server_Data = JSON.parse(localStorage['Server_Data']);
        console.log($scope.Server_Data);

        local_Script_Link = localStorage['local_Script_Link'];
        local_Google_APIKey = localStorage['local_Google_APIKey'];

        $scope.Settings_Script_Link = local_Script_Link;
        $scope.Settings_Main_GoogleDriveAPIKEY = local_Google_APIKey;
    };

    $scope.copy_to_clip = function(toCopy){
        navigator.clipboard.writeText(toCopy);
    }
});