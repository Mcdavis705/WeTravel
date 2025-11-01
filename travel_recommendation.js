

const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

function searchResults(){
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML='';

    fetch('./travel_recommendation_api.json')
        .then(response => response.json())  
        .then(data => {
            console.log(data);  
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}