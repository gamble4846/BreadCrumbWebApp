var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {

    $scope.init = function(){
        $scope.Server_Data = JSON.parse(localStorage['Server_Data']);
        console.log($scope.Server_Data);
        $scope.bifurcateDATA();
        console.log($scope.History_DATA);
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

    $scope.TvShow_Click = function(t_id,t_server){
        localStorage.setItem('Opened_series_id', t_id);
        localStorage.setItem('Opened_series_server', t_server);
        console.log(localStorage['Opened_series_id']);
        console.log(localStorage['Opened_series_server']);
        window.location.replace("openedTvShow.html");
    };
});