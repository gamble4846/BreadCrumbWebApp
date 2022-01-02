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
        $scope.call_snake_bar("Settings Saved");
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

    $scope.open_link_newtab = function(link){
        window.open(link, '_blank');
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

    $scope.copy_password = function(toCopy){
        $scope.call_snake_bar("Password Copied");
        $scope.copy_to_clip(toCopy);
    }

    $scope.TvShowLink_Mal = function(link, copy_open, direct_nornmal, inco, rev_seasonid, rev_episodeid){
        final_link = link;
        if(direct_nornmal == "direct"){
            final_link = $scope.create_APILink(link);
        }

        if(copy_open == "copy"){
            $scope.copy_to_clip(final_link);
            $scope.call_snake_bar("Link Copied");
        }
        else{
            $scope.open_link_newtab(final_link);
        }

        if(inco){
            $scope.CreateHistory_TvShow(rev_seasonid,rev_episodeid);
        }
    };

    $scope.MovieLink_Mal = function(link, inco, direct_nornmal, copy_open){

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
    };

    $scope.getCurrentEpsiodeLinks = function(get_Episode_id){
        toreturn_links = [];
        for(let i=0; i<$scope.current_tvshow_links.length; i++){
            if($scope.current_tvshow_links[i].Episode_Id == get_Episode_id){
                toreturn_links.push($scope.current_tvshow_links[i]);
            }
        }
        return toreturn_links;
    };

    $scope.CalculateTvShowHistory = function(Season_Id, Episode_Id){
        final_count = 0;
        for(let i=0; i<$scope.History_DATA.TvShows.length; i++){
            for(let j=0; j<$scope.History_DATA.TvShows[i].DATA.length; j++){
                if($scope.History_DATA.TvShows[i].DATA[j].Server_ID_His == $scope.local_Opened_Series_Server){
                    if($scope.History_DATA.TvShows[i].DATA[j].Series_Id_His == $scope.local_Opened_Series_ID){
                        if($scope.History_DATA.TvShows[i].DATA[j].Series_SeasonId_His == Season_Id){
                            if($scope.History_DATA.TvShows[i].DATA[j].Series_EpisodeID_His == Episode_Id){
                                final_count++;
                            }
                        }
                    }
                }
            }
        }
        return final_count;
    };

    $scope.CreateHistory_TvShow = function(Season_Id, Episode_Id){
        console.log($scope.local_Opened_Series_Serve);
        console.log($scope.local_Opened_Series_ID);

        Para1 = "?main=CreateHistory_TvShow&Series_SeasonId_His="+Season_Id+"&Series_EpisodeID_His="+Episode_Id;
        Para2 = "&Server_ID_His="+$scope.local_Opened_Series_Server;
        Para3 = "&Series_Id_His="+$scope.local_Opened_Series_ID;
        Para4 = "&Date_Time_His="+$scope.getCurrentTime();

        final_Para = Para1 + Para2 + Para3 + Para4;

        $http.post(localStorage['local_Script_Link']+final_Para).then(function(response){
            console.log(response.data);
        });
    };

    $scope.getCurrentTime = function () { 
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        return datetime;
    };

    $scope.call_snake_bar = function(message){
        var x = document.getElementById("snackbar");
        x.innerHTML = message;
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        console.log("Snake Bar Called");
    };
});