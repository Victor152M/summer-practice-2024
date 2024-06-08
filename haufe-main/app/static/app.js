document.addEventListener('DOMContentLoaded', () => {
    const recommendationForm = document.getElementById('recommendation-form');
    const groupForm = document.getElementById('group-form');
    const recommendationsList = document.getElementById('recommendations-list');
    const groupsList = document.getElementById('groups-list');

    recommendationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newRecommendation = {
            link: document.getElementById('link').value,
            message: document.getElementById('message').value,
            viewedAt: document.getElementById('viewed-at').value,
            rating: document.getElementById('rating').value,
            poster: document.getElementById('poster').value
        };

        
        fetch('/api/recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecommendation)
        })
        .then(response => response.json())
        .then(data => {
            addRecommendationToList(data);
            recommendationForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    groupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newGroup = {
            name: document.getElementById('group-name').value
        };

        // Assuming you have an API endpoint to handle group creation
        fetch('/api/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGroup)
        })
        .then(response => response.json())
        .then(data => {
            addGroupToList(data);
            groupForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    function addRecommendationToList(recommendation) {
        const recommendationItem = document.createElement('div');
        recommendationItem.className = 'recommendation-item';
        recommendationItem.innerHTML = `
            <h3>${recommendation.message}</h3>
            <p>Link: <a href="${recommendation.link}" target="_blank">${recommendation.link}</a></p>
            <p>Viewed at: ${recommendation.viewedAt}</p>
            <p>Rating: ${recommendation.rating}/5</p>
            <img src="${recommendation.poster}" alt="${recommendation.message}">
        `;
        recommendationsList.appendChild(recommendationItem);
    }

    function addGroupToList(group) {
        const groupItem = document.createElement('div');
        groupItem.className = 'group-item';
        groupItem.textContent = group.name;
        groupsList.appendChild(groupItem);
    }

    // Fetch existing recommendations and groups when the page loads
    fetch('/api/recommendations')
        .then(response => response.json())
        .then(data => {
            data.forEach(recommendation => addRecommendationToList(recommendation));
        })
        .catch(error => console.error('Error:', error));

    fetch('/api/groups')
        .then(response => response.json())
        .then(data => {
            data.forEach(group => addGroupToList(group));
        })
        .catch(error => console.error('Error:', error));
});
