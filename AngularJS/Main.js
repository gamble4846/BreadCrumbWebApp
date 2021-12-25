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
            case 11:
                $scope.settings_page = true;
                break;
          }
    };

    $scope.hideall = function(value) {
        $scope.website_all = false;
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
        $scope.loading = false;
        $scope.opened_movie = false;
        $scope.settings_page = false;
        $(window).scrollTop(0);
    };

    $scope.init = function () {
        $scope.TvShow_DATA = null;
        $scope.Movies_DATA = null;
        $scope.Books_DATA = null;
        $scope.Games_DATA = null;
        $scope.Manga_DATA = null;
        $scope.Comics_DATA = null;
        $scope.Folders_Files_DATA = null;
        $scope.hideall();
        var ALL_Cookies = document.cookie.split('; ').reduce((prev, current) => {
            const [name, ...value] = current.split('=');
            prev[name] = value.join('=');
            return prev;
        }, {});;

        Cookie_Script_Link = ALL_Cookies.Cookie_Script_Link;
        Cookie_Google_APIKey = ALL_Cookies.Cookie_Google_APIKey;
        $scope.Settings_Script_Link = Cookie_Script_Link;

        if(Cookie_Script_Link == "" || Cookie_Script_Link == null){
            $scope.hideall();
            $scope.change_page(11);
        }
        else{
            $scope.loading = true;
            $scope.GETDATAFROMAPI(Cookie_Script_Link);
        }
    };

    $scope.GETDATAFROMAPI = function(SCRIPT_LINK){
        $http.get(SCRIPT_LINK).then(function(response){
            $scope.Server_Data = response;
            $scope.loading = false;
            $scope.change_page(1);
            $scope.bifurcateDATA();
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
    };

    $scope.OpenMovie = function (movie, Server_ID_lis) {
        $scope.hideall();
        $scope.opened_movie = true;

        movies_links_data = $scope.Movies_DATA.Links;
        currentMovieLinks = [];
        for (let i = 0; i < movies_links_data.length; i++) {
            if(movies_links_data[i].Server_ID == Server_ID_lis){
                for(let j = 0; j< (movies_links_data[i].DATA).length; j++){
                    if((movies_links_data[i].DATA[j]).Movies_Id == movie.Movies_Id){
                        currentMovieLinks.push(movies_links_data[i].DATA[j])
                    }
                }
            }
        }

        $scope.OpenedMovieTitle = movie;
        $scope.OpenedMovieLinks = currentMovieLinks;
    };

    $scope.mySplit = function(string) {
        var array = string.split(',');
        return array;
    };

    $scope.Genre_FUN = function(genre, section){
        alert(genre + section);
    };

    $scope.OpenURLNewTab = function(URL){
        window.open(URL, '_blank').focus();
    };

    $scope.OpenLink = function(URL, Inco){
        $scope.OpenURLNewTab(URL);
    };

    $scope.CopyLink = function(URL, Inco){
        $scope.CopyString(URL);
    };

    $scope.CopyString = function(STR){
        navigator.clipboard.writeText(STR);
    };

    $scope.SaveSettings = function(){
        document.cookie = "Cookie_Script_Link="+$scope.Settings_Script_Link+"; expires=Thu, 18 Dec 2100 12:00:00 UTC; path=/";
        document.cookie = "Cookie_Google_APIKey="+$scope.Settings_Main_GoogleDriveAPIKEY+"; expires=Thu, 18 Dec 2100 12:00:00 UTC; path=/";
        $scope.init();
    };
});