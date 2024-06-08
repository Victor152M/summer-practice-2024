document.addEventListener('DOMContentLoaded', () => {
    const recommendationForm = document.getElementById('recommendation-form');
    const recommendationsList = document.getElementById('recommendations-list');

    recommendationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(recommendationForm);
        const recommendationData = {
            link: formData.get('link'),
            message: formData.get('message'),
            viewed_at: formData.get('viewed-at'),
            rating: formData.get('rating'),
            poster: formData.get('poster')
        };

        try {
            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recommendationData)
            });

            if (!response.ok) {
                throw new Error('Failed to add recommendation');
            }

            const newRecommendation = await response.json();
            addRecommendationToList(newRecommendation);
            recommendationForm.reset();
        } catch (error) {
            console.error('Error adding recommendation:', error);
        }
    });

    function addRecommendationToList(recommendation) {
        const recommendationItem = document.createElement('div');
        recommendationItem.classList.add('recommendation-item');
        recommendationItem.innerHTML = `
            <h3>${recommendation.message}</h3>
            <p>Link: <a href="${recommendation.link}" target="_blank" rel="noopener noreferrer">${recommendation.link}</a></p>
            <p>Viewed at: ${recommendation.viewedAt}</p>
            <p>Rating: ${recommendation.rating}/5</p>
            <img src="${recommendation.poster}" alt="${recommendation.message}">
        `;
        recommendationsList.appendChild(recommendationItem);
    }
});
