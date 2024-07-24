document.addEventListener('DOMContentLoaded', () => {
    const breedButtons = document.getElementById('breed-buttons');

    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            return Promise.all(breeds.map(breed => 
                fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
                    .then(response => response.json())
                    .then(imageData => ({
                        breed,
                        imageUrl: imageData.message
                    }))
            ));
        })
        .then(breedData => {
            breedData.forEach(({ breed, imageUrl }) => {
                const card = document.createElement('a');
                card.href = `details.html?breed=${breed}`;
                card.className = 'card';

                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Imagem de ${breed}`;

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                const h3 = document.createElement('h3');
                h3.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);

                cardBody.appendChild(h3);
                card.appendChild(img);
                card.appendChild(cardBody);
                breedButtons.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
});
