// Store all card wrappers for filtering
let cardWrappers = [];

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
                wrapper.dataset.name = cardName.toLowerCase(); // Add name as data attribute for filtering
                wrapper.appendChild(img);

                const title = document.createElement('p');
                title.textContent = cardName;
                wrapper.appendChild(title);

                // Store wrapper for filtering
                cardWrappers.push(wrapper);

                // Add wrapper to container
                container.appendChild(wrapper);
            }
        });

        // Add count of loaded images
        const loadedImages = container.getElementsByTagName('img').length;
        console.log(`Loaded ${loadedImages} images`);

        // Initialize search functionality
        initializeSearch();

    } catch (error) {
        console.error('Error loading card list:', error);
        // Display error message on the page
        const container = document.getElementById('imageContainer');
        container.innerHTML = `<p style="color: red;">Error loading images: ${error.message}</p>`;
    }
}

// Function to initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');

    // Add input event listener for real-time filtering
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        cardWrappers.forEach(wrapper => {
            const cardName = wrapper.dataset.name;
            if (cardName.includes(searchTerm)) {
                wrapper.classList.remove('hidden');
            } else {
                wrapper.classList.add('hidden');
            }
        });
    });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCardList();
}); 