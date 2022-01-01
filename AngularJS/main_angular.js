var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {

    $scope.init_index = function(){
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

    $scope.init_tvshow = function(){
        $scope.Server_Data = JSON.parse(localStorage['Server_Data']);
        console.log($scope.Server_Data);
        $scope.bifurcateDATA();
        console.log($scope.History_DATA);
    }

    $scope.TvShow_Click = function(t_id,t_server){
        localStorage.setItem('Opened_series_id', t_id);
        localStorage.setItem('Opened_series_server', t_server);
        console.log(localStorage['Opened_series_id']);
        console.log(localStorage['Opened_series_server']);
        window.location.replace("openedTvShow.html");
    };

    $scope.SaveSettings = function(){
        localStorage.setItem('local_Script_Link', $scope.Settings_Script_Link);
        localStorage.setItem('local_Google_APIKey', $scope.Settings_Main_GoogleDriveAPIKEY);
    };

    $scope.init_settings = function(){
        $scope.Server_Data = JSON.parse(localStorage['Server_Data']);
        console.log($scope.Server_Data);

        local_Script_Link = localStorage['local_Script_Link'];
        local_Google_APIKey = localStorage['local_Google_APIKey'];

        $scope.Settings_Script_Link = local_Script_Link;
        $scope.Settings_Main_GoogleDriveAPIKEY = local_Google_APIKey;
    };

    $scope.init_movies = function(){
        $scope.Server_Data = JSON.parse(localStorage['Server_Data']);
        console.log($scope.Server_Data);
        $scope.bifurcateDATA();
    };

    $scope.Movie_Click = function(m_id,m_server){
        localStorage.setItem('Opened_movie_id', m_id);
        localStorage.setItem('Opened_movie_server', m_server);
        console.log(localStorage['Opened_movie_id']);
        window.location.replace("openedMovie.html");
    };

    $scope.init_OpenedMovie = function(){
        $scope.Server_Data = JSON.parse(localStorage['Server_Data']);
        $scope.local_Opened_Movie_ID = localStorage['Opened_movie_id'];
        $scope.local_Opened_Movie_Server = localStorage['Opened_movie_server'];
        $scope.local_Google_APIKey = localStorage['local_Google_APIKey'];

        console.log($scope.Server_Data);
        console.log($scope.local_Opened_Movie_ID);
        console.log($scope.local_Opened_Movie_Server);

        $scope.bifurcateDATA();
        $scope.GetCurrentMovie();
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
    };

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

    $scope.init_OpenedTvShow = function(){
        $scope.Server_Data = JSON.parse(localStorage['Server_Data']);
        $scope.local_Opened_Series_ID = localStorage['Opened_series_id'];
        $scope.local_Opened_Series_Server = localStorage['Opened_series_server'];
        $scope.local_Google_APIKey = localStorage['local_Google_APIKey'];

        $scope.bifurcateDATA();
        $scope.GetCurrentTvShow();
    }

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
    };

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
});