

// Select elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const movieResults = document.getElementById('movie-results');
const favoritesList = document.getElementById('favorites-list');
const pagination = document.getElementById('pagination');
const favorite = document.getElementById('favorites');
const back = document.getElementById('back');
// Search Movies
searchButton.addEventListener('click', searchMovies);

 function searchMovies() {
    const query = searchInput.value.trim();
    console.log(query);
    if (query) {
        fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=2d1558c7&t=${query}`)
    
            .then(response => response.json())
            .then(movie =>{
                console.log(movie);
                movieResults.innerHTML = `
                    <div>
                        <h2>${movie.Title}</h2>
                        <img src="${movie.Poster}" alt="${movie.Title} poster">
                        <p>Year: ${movie.Year}</p>
                        <p>Type: ${movie.Type}</p>
                        <p>Ratings:⭐⭐⭐⭐ - 10/7.9</p>
                        <button style=background-color:green;border:none;color:white;height:5vh;cursor:pointer;  onclick=addToFavorite()>Add to Favorites</button>
                    </div>`
                })
            .catch(error => console.error('Error:', error));
           
        
    } else {
        alert("Please enter movie name");

    }
}

// Display Movies
function displayMovies() {
    fetch(`https://www.omdbapi.com/?s=avengers&apikey=2d1558c7`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.Search) {
            // Use map to iterate over each movie in the Search array and display it
            movieResults.innerHTML = data.Search.map(movie => `
               <div style="max-width: 300px; border: 1px solid #ccc; padding: 10px; text-align: center;">
    <h2 style="font-size: 1.5rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        ${movie.Title}
    </h2>
    <img src="${movie.Poster}" alt="${movie.Title} poster" style="max-width: 100%; height: auto;">
    <p>Year: ${movie.Year}</p>
    <p>Type: ${movie.Type}</p>
    <p>Ratings: ⭐⭐⭐⭐ - 10/7.9</p>
    <button style="background-color: green; border: none; color: white; height: 5vh; cursor: pointer;" onclick="addToFavorite('${movie.imdbID}')">Add to Favorites</button>
</div>

            `).join(''); // Use join('') to combine the resulting HTML into a single string

           
        } else {
            movieResults.innerHTML = `<p>No results found</p>`;
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        movieResults.innerHTML = `<p>Error fetching movies</p>`;
    });
}

displayMovies();


// dark theme
let mode = document.getElementById('mode');
let theme = true;
document.getElementById('mode').addEventListener('click',()=>{  
        if(theme){
        mode.src = './img/light-mode.png'
        mode.style.filter='invert(100%)'
         document.body.style.backgroundColor='black'
        document.body.style.color="white"
        theme = false;
        }
         else {
            mode.src = './img/night-mode.png'
            mode.style.filter = 'invert(0%)'  
             document.body.style.backgroundColor='white'
            document.body.style.color="black"
            theme = true;
              
        }
})
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
console.log(favorites.length);

function addToFavorite(id) {
    if (favorites.length > 0) {
        localStorage.removeItem('favorites');
        favorites = [];
        return;
    }
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        alert(`Movie with ID ${id} has been added to your favorites.`);
    } else {
        alert(`Movie with ID ${id} is already in your favorites.`);
    }
}



function displayFavorites(){
    console.log(favorites); 
     fetch(`https://www.omdbapi.com/?i=${favorites}&apikey=2d1558c7`)
    .then(response => response.json())
    .then(movie =>{
        console.log(movie);
        movieResults.innerHTML = `
            <div style="max-width: 300px; border: 1px solid #ccc; padding: 10px; text-align: center;">
    <h2 style="font-size: 1.5rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        ${movie.Title}
    </h2>
    <img src="${movie.Poster}" alt="${movie.Title} poster" style="max-width: 100%; height: auto;">
    <p>Year: ${movie.Year}</p>
    <p>Type: ${movie.Type}</p>
    <p>Ratings: ⭐⭐⭐⭐ - 10/7.9</p>
</div>
       `
     
        })
    .catch(error => console.error('Error:', error));
} 

favorite.addEventListener('click',()=>{
    displayFavorites();
    let btn = document.createElement('button');
    btn.textContent = 'Go back';
    btn.style.color= 'white';
    btn.style.backgroundColor= 'red';
    btn.style.border = 'none';
    btn.style.height = '5vh';
    btn.style.borderRadius = '5px';
    btn.style.cursor = 'pointer';
    back.appendChild(btn);
    
});
back.addEventListener('click',()=>{
location.reload();
})
