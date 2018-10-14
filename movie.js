function getSite(id) {

    //alert(id);
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9f81f98dda461876ca00dc09fc4226ac&language=en-US`, {
	method: 'GET',
    }).then(reply => reply.json()).then(function(reply){
        console.log(reply);
        // return reply.homepage;
	if ( reply.homepage != null )
	{
            document.getElementById("website").setAttribute('href', reply.homepage);
            document.getElementById("poster").setAttribute('src', `http://image.tmdb.org/t/p/w200/${reply.poster_path}`);

	}
    }).catch(error => console.error('Error: ', error));

}


function getGenre(genre) {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9f81f98dda461876ca00dc09fc4226ac&language=en-US', {
	method: 'GET',
    }).then(result => result.json()).then(function(result){
        console.log(result);
        var gen = result.genres;

        for ( var i = 0; i < gen.length; i++ )
        {
            if ( gen[i].name.toLowerCase() == genre.toLowerCase() )
            {
                return gen[i].id;
            }
        }
        return 37;
    }).catch(error => console.error('Error: ', error));
}


function getMovieRec(genre) {

    var genre_id = getGenre(genre);
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=9f81f98dda461876ca00dc09fc4226ac&sort_by=popularity.desc&primary_release_date.gt=2014', {
        method: 'GET',
            params: {
                //api_key: '9f81f98dda461876ca00dc09fc4226ac',
                language: 'en-US',
                //sort_by: 'original_title.asc',
                include_adult: 'false',
                include_video: 'false',
                page: 1,
                with_genres: genre_id
            }

    }).then(response => response.json()).then(function(response){
        console.log(response);
        let random = Math.floor(Math.random() * 20);
        document.getElementById("title").innerHTML = response.results[random].original_title;
        document.getElementById("rating").innerHTML = response.results[random].vote_average;
        getSite(response.results[random].id);
    }).catch(error => console.error('Error: ', error));
}


document.getElementById('selections').addEventListener('change', function(){
        
    if(document.getElementById('selections').value == 'Movies'){

        document.getElementById('option2').style.display = "block";
        document.getElementById('options').style.display = "none";
    }
});

document.getElementById("movieButton").addEventListener('mouseup', function(){
    if(document.getElementById('genreName').value){
        getMovieRec(document.getElementById('genreName').value);
        document.getElementById('option2').style.display = "none";
        document.getElementById('info').style.display = "block";
    }
});

document.getElementById('genreName').addEventListener("keyup", function(event) {
    if (event.keyCode === 13 && document.getElementById('genreName').value) {
        getMovieRec(document.getElementById('genreName').value);
        document.getElementById('option2').style.display = "none";
        document.getElementById('info').style.display = "block";
    }
  });

