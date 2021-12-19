var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {
    $scope.change_page = function(value) {
        $scope.hideall();
        $scope.website_all = true;
        switch(value) {
            case 1:
                $scope.home_page = true;
                break;
            case 2:
                $scope.tvshows_page = true;
                break;
            case 3:
                $scope.movies_page = true;
                break;
            case 4:
                $scope.books_page = true;
                break;
            case 5:
                $scope.games_page = true;
                break;
            case 6:
                $scope.manga_page = true;
                break;
            case 7:
                $scope.comics_page = true;
                break;
            case 8:
                $scope.folders_files_page = true;
                break;
            case 9:
                $scope.softwares_page = true;
                break;
            case 10:
                $scope.photos_page = true;
                break;
          }
    };

    $scope.hideall = function(value) {
        $scope.home_page = false;
        $scope.tvshows_page = false;
        $scope.movies_page = false;
        $scope.books_page = false;
        $scope.games_page = false;
        $scope.manga_page = false;
        $scope.comics_page = false;
        $scope.folders_files_page = false;
        $scope.softwares_page = false;
        $scope.photos_page = false;
        $scope.website_all = false;
        $scope.loading = false;
    };

    $scope.init = function () {
        $scope.hideall();
        $scope.loading = true;
    };

    $http.get('').then(function(response){
        $scope.Server_Data = response;
        $scope.loading = false;
        $scope.change_page(1);
        $scope.bifurcateDATA();
    });

    $scope.bifurcateDATA = function(){
        $scope.TvShow_DATA = $scope.Server_Data.data.TvShows;
        $scope.Movies_DATA = $scope.Server_Data.data.Movies;
        $scope.Books_DATA = $scope.Server_Data.data.Books;
        $scope.Games_DATA = $scope.Server_Data.data.Games;
        $scope.Manga_DATA = $scope.Server_Data.data.Manga;
        $scope.Comics_DATA = $scope.Server_Data.data.Comics;
        $scope.Folders_Files_DATA = $scope.Server_Data.data.Folders_Files;
    };
});