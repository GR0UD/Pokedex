const limit = 100; // Number of Pokémon to load each time
let offset = 0;
const API_URL = "https://pokeapi.co/api/v2/pokemon";

// Function to load Pokémon and manage the "More" button
function loadPokemon(offset, limit) {
  fetch(`${API_URL}?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {
      const pokemonPromises = data.results.map((pokemon) => {
        return fetch(pokemon.url).then((pokemonResponse) =>
          pokemonResponse.json()
        );
      });

      Promise.all(pokemonPromises).then((pokemonDetails) => {
        const listeDiv = document.getElementById("pokemon-list");
        const selectedImageDiv = document.getElementById("showcase-image");
        const selectedInfoDiv = document.getElementById("info");

        // Remove the existing "More" button (if any)
        const moreButton = document.getElementById("show-more-button");
        if (moreButton) {
          moreButton.remove();
        }

        // Append new Pokémon images
        pokemonDetails.forEach((pokemon) => {
          const img = document.createElement("img");
          img.src = pokemon.sprites.front_default;
          img.classList.add("selected-pokemon");

          img.addEventListener("click", () => {
            const newUrl = new URL(window.location);
            newUrl.searchParams.set("name", pokemon.name);
            window.history.pushState({}, "", newUrl);

            const existingImg = selectedImageDiv.querySelector("img");
            if (existingImg) {
              existingImg.src = pokemon.sprites.front_default;
            } else {
              const selectedImg = document.createElement("img");
              selectedImg.src = pokemon.sprites.front_default;
              selectedImageDiv.appendChild(selectedImg);
            }

            const types = pokemon.types
              .map((typeInfo) => typeInfo.type.name)
              .join(", ");

            fetch(pokemon.species.url)
              .then((speciesResponse) => speciesResponse.json())
              .then((speciesData) => {
                const race = speciesData.name;

                selectedInfoDiv.innerHTML = `
                  <h1>${pokemon.name}</h1>
                  <p><strong>Type:</strong> ${types}</p>
                  <p><strong>Race:</strong> ${race}</p>
                `;

                localStorage.setItem(
                  "selectedPokemon",
                  JSON.stringify(pokemon)
                );
              });
          });

          listeDiv.appendChild(img);
        });

        // Re-create and append the "More" button after loading Pokémon
        createMoreButton();
      });
    });
}

// Function to create the "More" button
function createMoreButton() {
  const listeDiv = document.getElementById("pokemon-list");
  const moreButton = document.createElement("button");
  moreButton.id = "show-more-button";
  moreButton.innerText = "More";

  moreButton.addEventListener("click", () => {
    offset += limit; // Increase the offset to load the next batch
    loadPokemon(offset, limit);
  });

  listeDiv.appendChild(moreButton); // Append the button at the bottom of the list
}

// Initial load of Pokémon
loadPokemon(offset, limit);

document.getElementById("details").addEventListener("click", (event) => {
  event.preventDefault();

  const selectedPokemon = localStorage.getItem("selectedPokemon");
  if (selectedPokemon) {
    window.location.href = "details.html";
  } else {
    alert("Vælg venligst en Pokémon først!");
  }
});
