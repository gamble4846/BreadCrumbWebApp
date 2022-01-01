var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {

    $scope.init = function(){
        $scope.Server_Data = JSON.parse(localStorage['Server_Data']);
        $scope.local_Opened_Series_ID = localStorage['Opened_series_id'];
        $scope.local_Opened_Series_Server = localStorage['Opened_series_server'];
        $scope.local_Google_APIKey = localStorage['local_Google_APIKey'];

        $scope.bifurcateDATA();
        $scope.GetCurrentTvShow();
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

    $scope.GetCurrentTvShow = function(){
        tvshow_titles = $scope.TvShow_DATA.Titles;

        for (let i = 0; i < tvshow_titles.length; i++) {
            if($scope.local_Opened_Series_Server == tvshow_titles[i].Server_ID){
                for(let j=0; j < (tvshow_titles[i].DATA).length; j++){
                    if(tvshow_titles[i].DATA[j].Series_Id == $scope.local_Opened_Series_ID){
                        $scope.current_tvshow_details = tvshow_titles[i].DATA[j];
                    }
                }
            }
        }

        gen = $scope.current_tvshow_details.Series_Genre.split(", ");
        $scope.current_tvshow_details.Series_Genre = gen;

        tvshow_seasons = $scope.TvShow_DATA.Seasons;

        currentTvShowSeason = [];
        for(let i=0; i<tvshow_seasons.length; i++){
            if($scope.local_Opened_Series_Server == tvshow_seasons[i].Server_ID){
                for(let j=0; j<(tvshow_seasons[i].DATA).length; j++){
                    if(tvshow_seasons[i].DATA[j].Series_Id == $scope.local_Opened_Series_ID){
                        currentTvShowSeason.push(tvshow_seasons[i].DATA[j])
                    }
                }
            }
        }

        $scope.current_tvshow_seasons = currentTvShowSeason;

        tvshow_episodes = $scope.TvShow_DATA.Episodes;

        currentTvShowEpisodes = [];
        for(let i=0; i<tvshow_episodes.length; i++){
            if($scope.local_Opened_Series_Server == tvshow_episodes[i].Server_ID){
                for(let j=0; j<(tvshow_episodes[i].DATA).length; j++){
                    currentTvShowEpisodes.push(tvshow_episodes[i].DATA[j]);
                }
            }
        }

        $scope.current_tvshow_episodes = currentTvShowEpisodes;


        tvshow_links = $scope.TvShow_DATA.Links;

        currentTvShowLinks = [];
        for(let i=0; i<tvshow_links.length; i++){
            if($scope.local_Opened_Series_Server == tvshow_links[i].Server_ID){
                for(let j=0; j<(tvshow_links[i].DATA).length; j++){
                    currentTvShowLinks.push(tvshow_links[i].DATA[j]);
                }
            }
        }

        $scope.current_tvshow_links = currentTvShowLinks;
    }

    $scope.getCurrentSeasonEpisodes = function(get_Season_id){
        toreturn_epsodes = [];
        for(let i=0; i<$scope.current_tvshow_episodes.length; i++){
            if($scope.current_tvshow_episodes[i].Season_Id == get_Season_id){
                toreturn_epsodes.push($scope.current_tvshow_episodes[i]);
            }
        }
        return toreturn_epsodes;
    }

    $scope.getCurrentEpsiodeLinks = function(get_Episode_id){
        toreturn_links = [];
        for(let i=0; i<$scope.current_tvshow_links.length; i++){
            if($scope.current_tvshow_links[i].Episode_Id == get_Episode_id){
                toreturn_links.push($scope.current_tvshow_links[i]);
            }
        }
        return toreturn_links;
    }

    $scope.copy_to_clip = function(toCopy){
        navigator.clipboard.writeText(toCopy);
    }

    $scope.CopyLink = function(link, inco){
        $scope.copy_to_clip(link);
    };

    $scope.OpenLink = function(link, inco){
        window.open(link, '_blank');
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
        return final_link;
    };

    $scope.DirectLinkCopy = function(link, inco){
        final_link = $scope.create_APILink(link);
        $scope.CopyLink(final_link, inco);
    };
});