var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {

    $scope.init = function(){
        $scope.Server_Data = JSON.parse(localStorage['Server_Data']);
        console.log($scope.Server_Data);
        $scope.bifurcateDATA();
    }

    $scope.bifurcateDATA = function(){
        $scope.TvShow_DATA = $scope.Server_Data.data.TvShows;
        $scope.Movies_DATA = $scope.Server_Data.data.Movies;
        $scope.Books_DATA = $scope.Server_Data.data.Books;
        $scope.Games_DATA = $scope.Server_Data.data.Games;
        $scope.Manga_DATA = $scope.Server_Data.data.Manga;
        $scope.Comics_DATA = $scope.Server_Data.data.Comics;
        $scope.Folders_Files_DATA = $scope.Server_Data.data.Folders_Files;
    };

    $scope.Movie_Click = function(m_id,m_server){
        localStorage.setItem('Opened_movie_id', m_id);
        localStorage.setItem('Opened_movie_server', m_server);
        console.log(localStorage['Opened_movie_id']);
        window.location.replace("openedMovie.html");
    };
    
    $scope.copy_to_clip = function(toCopy){
        navigator.clipboard.writeText(toCopy);
    }
});