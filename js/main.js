$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});
// dynamic dispaly of movie
function getMovies(searchText) {
    var temp='http://www.omdbapi.com/?i=tt3896198&apikey=f6318a9&s=';
    // fetch the movie with reqiored

    fetch((temp+searchText)  || ( process.env.db_url1  + searchText)).then(function (response) {
    // The API call was successful!
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
    // This is the JSON from our response
    let movies = data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                // dynamically create the content
                output += `
                <div class="col-md-3">
                <div>
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                <a onClick="favouriteMovie('${movie.Poster}','${movie.Title}')" class="btn btn-primary" href="favouriteMovie.html">ADD TO Favourite Movie</a>
                
                </div>
                </div>
                
                `;
            });

            $('#movies').html(output);
    console.log(data);
}).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
});


}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function favouriteMovie(id, name) {

    localStorage.setItem(name, id);
    window.location = 'favouriteMovie.html';
    return false;
}

function displayFavourite() {
    let output = '';



    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        console.log(localStorage.getItem(key));
        output += `
        <div class="col-md-3">
        <div>
        <img src="${localStorage.getItem(key)}">
        <h5>${key}</h5>
        </div>
        </div>
        
        `;
    }
    $('#movie1').html(output);
}
// get the movie from the local stire for favourite movie
function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    var temp='http://www.omdbapi.com/?&apikey=f6318a9&i=';
    fetch((temp+movieId)  || ( process.env.db_url1  + movieId)).then(function (response) {
    // The API call was successful!
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
     let movie =data;
//  create the content of the movie dynamically
            let output = `
            <div class="row">
            <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
            <li class="list-group-item"><strong>Gerne :</strong> ${movie.Gerne}</li>
            <li class="list-group-item"><strong>Released :</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated :</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMBD Rating :</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director :</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer :</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors :</strong> ${movie.Actors}</li>
            </ul>
            
            </div>

            </div>
            <div class="row">
            <div class="well">
                <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-default">Go Back To Search</a>
                <a onClick="favouriteMovie('${movie.Poster}','${movie.Title}')" class="btn btn-primary" href="index.html">ADD TO Favourite Movie</a>
            </div>
        </div>
            
            
            `;

            $('#movie').html(output);
    // This is the JSON from our response
    console.log(data);
}).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
});

}
