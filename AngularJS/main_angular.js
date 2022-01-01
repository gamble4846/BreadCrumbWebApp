var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {

    $scope.init = function(){
        $scope.loader_show = true;
        local_Script_Link = localStorage['local_Script_Link'];
        local_Google_APIKey = localStorage['local_Google_APIKey'];

        $scope.Settings_Script_Link = local_Script_Link;

        if(local_Script_Link == "" || local_Script_Link == null){
            window.location.href = "settings.html";
        }
        else{
            $scope.GETDATAFROMAPI(local_Script_Link);
        }
    }

    $scope.GETDATAFROMAPI = function(SCRIPT_LINK){
        console.log("Api Started");
        $http.get(SCRIPT_LINK).then(function(response){
            $scope.Server_Data = response;
            $scope.bifurcateDATA();
            console.log("Api Ended");

            localStorage.setItem('Server_Data', JSON.stringify($scope.Server_Data));
            $scope.loader_show = false;
            $scope.footer_show = true;
            $scope.catalog_show = true;
            $scope.header_show = true;
        });
    }


    $scope.bifurcateDATA = function(){
        $scope.TvShow_DATA = $scope.Server_Data.data.TvShows;
        $scope.Movies_DATA = $scope.Server_Data.data.Movies;
        $scope.Books_DATA = $scope.Server_Data.data.Books;
        $scope.Games_DATA = $scope.Server_Data.data.Games;
        $scope.Manga_DATA = $scope.Server_Data.data.Manga;
        $scope.Comics_DATA = $scope.Server_Data.data.Comics;
        $scope.Folders_Files_DATA = $scope.Server_Data.data.Folders_Files;
        $scope.History_DATA = $scope.Server_Data.data.History;
    };

    $scope.copy_to_clip = function(toCopy){
        navigator.clipboard.writeText(toCopy);
    }
});