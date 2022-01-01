var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {

    $scope.init = function(){
        $scope.Server_Data = JSON.parse(localStorage['Server_Data']);
        $scope.local_Opened_Movie_ID = localStorage['Opened_movie_id'];
        $scope.local_Opened_Movie_Server = localStorage['Opened_movie_server'];
        $scope.local_Google_APIKey = localStorage['local_Google_APIKey'];

        console.log($scope.Server_Data);
        console.log($scope.local_Opened_Movie_ID);
        console.log($scope.local_Opened_Movie_Server);

        $scope.bifurcateDATA();
        $scope.GetCurrentMovie();

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

    $scope.GetCurrentMovie = function(){
        movies_titles = $scope.Movies_DATA.Titles;
        console.log(movies_titles);
        console.log(movies_titles.length);
        for (let i = 0; i < movies_titles.length; i++) {
            console.log(movies_titles[i].Server_ID);
            if($scope.local_Opened_Movie_Server == movies_titles[i].Server_ID){
                console.log("Found");
                for(let j=0; j < (movies_titles[i].DATA).length; j++){
                    if(movies_titles[i].DATA[j].Movies_Id == $scope.local_Opened_Movie_ID){
                        $scope.current_movie_details = movies_titles[i].DATA[j];
                        console.log($scope.current_movie_details);
                    }
                }
            }
        }

        movies_links_data = $scope.Movies_DATA.Links;
        currentMovieLinks = [];
        for (let i = 0; i < movies_links_data.length; i++) {
            if(movies_links_data[i].Server_ID == $scope.local_Opened_Movie_Server){
                for(let j = 0; j< (movies_links_data[i].DATA).length; j++){
                    if((movies_links_data[i].DATA[j]).Movies_Id == $scope.current_movie_details.Movies_Id){
                        currentMovieLinks.push(movies_links_data[i].DATA[j])
                    }
                }
            }
        }

        gen = $scope.current_movie_details.Movies_Genre.split(", ");
        $scope.current_movie_details.Movies_Genre = gen;

        $scope.current_movie_links = currentMovieLinks;
        console.log($scope.current_movie_links);
    }

    $scope.copy_to_clip = function(toCopy){
        navigator.clipboard.writeText(toCopy);
    }

    $scope.CopyLink = function(link, inco){
        $scope.copy_to_clip(link);
        console.log("Copying Link: " + link +", Inco: " + inco);
    };

    $scope.OpenLink = function(link, inco){
        window.open(link, '_blank');
        console.log("Opening Link: " + link +", Inco: " + inco);
    }

    $scope.DirectLinkOpen = function(link, inco){
        final_link = $scope.create_APILink(link);
        $scope.OpenLink(final_link, inco);
    }

    $scope.create_APILink = function(link){
        link_part_one = "https://www.googleapis.com/drive/v3/files/";
        link_part_three = "?alt=media&key=";
        link_part_four = $scope.local_Google_APIKey;
        div_link = link.split("/");
        link_part_two = div_link[5];
        final_link = link_part_one + link_part_two + link_part_three + link_part_four;
        console.log(final_link);
        return final_link;
    };

    $scope.DirectLinkCopy = function(link, inco){
        final_link = $scope.create_APILink(link);
        $scope.CopyLink(final_link, inco);
    };
});