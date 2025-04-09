// Function to fetch and load the card list data
async function loadCardList() {
    try {
        const response = await fetch('swu-card-list.json');
        const jsonData = await response.json();

        // Get the container element
        const container = document.getElementById('imageContainer');

        // Check if data exists and is an array
        if (!jsonData.data || !Array.isArray(jsonData.data)) {
            throw new Error('Invalid data structure: expected data array');
        }

        // Process each card in the data
        jsonData.data.forEach(card => {
            // Check if card has the required nested structure
            if (card.attributes?.artFront?.data?.attributes?.formats?.xsmall?.url) {
                const imgUrl = card.attributes.artFront.data.attributes.formats.xsmall.url;
                const cardName = card.attributes?.title || 'Star Wars Card';

                // Create image element
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = cardName;
                img.loading = 'lazy'; // Enable lazy loading for better performance

                // Add title below the image
                const wrapper = document.createElement('div');
                wrapper.className = 'card-wrapper';
                wrapper.appendChild(img);

                const title = document.createElement('p');
                title.textContent = cardName;
                wrapper.appendChild(title);

                // Add wrapper to container
                container.appendChild(wrapper);
            }
        });

        // Add count of loaded images
        const loadedImages = container.getElementsByTagName('img').length;
        console.log(`Loaded ${loadedImages} images`);

    } catch (error) {
        console.error('Error loading card list:', error);
        // Display error message on the page
        const container = document.getElementById('imageContainer');
        container.innerHTML = `<p style="color: red;">Error loading images: ${error.message}</p>`;
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCardList();
}); 