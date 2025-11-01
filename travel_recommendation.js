function searchResults() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'block'; // show results

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const keys = Object.keys(data);
            const matchedKey = keys.find(key => key.toLowerCase().includes(searchInput));

            if (matchedKey) {
                const selectedArray = data[matchedKey];

                selectedArray.forEach(item => {
                    if (matchedKey === 'countries') {
                        // Countries have cities
                        item.cities.forEach(city => {
                            resultsDiv.innerHTML += `
                                <div class="result-item">
                                    <img src="${city.imageUrl}" alt="${city.name}">
                                    <h2>${city.name}</h2>
                                    <p>${city.description}</p>
                                    <button type="button">View</button
                                </div>
                            `;
                        });
                    } else {
                        // Temples or beaches
                        resultsDiv.innerHTML += `
                            <div class="result-item">
                                <img src="${item.imageUrl}" alt="${item.name}">
                                <h2>${item.name}</h2>
                                <p>${item.description}</p>
                                <button type="button">View</button>
                            </div>
                        `;
                    }
                });

            } else {
                resultsDiv.innerHTML = 'Destination category not found.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultsDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

searchBtn.addEventListener('click', searchResults);
clearBtn.addEventListener('click', () => {
    const resultsDiv = document.getElementById('results');
    document.getElementById('searchInput').value = '';
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'none';
});
