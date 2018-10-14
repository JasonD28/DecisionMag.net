function getSite(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9f81f98dda461876ca00dc09fc4226ac&language=en-US`, {
	method: 'GET',
    }).then(reply => reply.json()).then(function(reply){
        // console.log(reply);
        // return reply.homepage;
        document.getElementById("website").innerHTML = reply.homepage;
    }).catch(error => console.error('Error: ', error));

}

fetch('https://api.themoviedb.org/3/discover/movie?api_key=9f81f98dda461876ca00dc09fc4226ac&sort_by=popularity.desc&primary_release_date.gt=2014', {
	method: 'GET',
    	params: {
            //api_key: '9f81f98dda461876ca00dc09fc4226ac',
            language: 'en-US',
            //sort_by: 'original_title.asc',
            include_adult: 'false',
            include_video: 'false',
            page: 1,
            with_genres: 28
    	}

}).then(response => response.json()).then(function(response){
    console.log(response);
    let random = Math.floor(Math.random() * 20);
    document.getElementById("title").innerHTML = response.results[random].original_title;
    document.getElementById("rating").innerHTML = response.results[random].vote_average;
    getSite(response.results[random].id);
}).catch(error => console.error('Error: ', error));