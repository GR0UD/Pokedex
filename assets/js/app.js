const amount = "?limit=30";
const API_URL = "https://pokeapi.co/api/v2/pokemon" + amount;

fetch(API_URL)
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

      pokemonDetails.forEach((pokemon) => {
        const img = document.createElement("img");
        img.src = pokemon.sprites.front_default;
        img.classList.add("selected-pokemon");

        img.addEventListener("click", () => {
          const newUrl = new URL(window.location);
          newUrl.searchParams.set("name", pokemon.name);
          window.history.pushState({}, "", newUrl);

          // Update the src of the existing image inside selectedImageDiv
          const existingImg = selectedImageDiv.querySelector("img");
          if (existingImg) {
            existingImg.src = pokemon.sprites.front_default; // Update src if image exists
          } else {
            // If no image exists, create it and append it (just as a fallback)
            const selectedImg = document.createElement("img");
            selectedImg.src = pokemon.sprites.front_default;
            selectedImageDiv.appendChild(selectedImg);
          }

          // Extract types as a comma-separated list
          const types = pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ");

          // Fetch species details for race
          fetch(pokemon.species.url)
            .then((speciesResponse) => speciesResponse.json())
            .then((speciesData) => {
              const race = speciesData.name;

              selectedInfoDiv.innerHTML = ""; 
              selectedInfoDiv.innerHTML = `
                <h1 class="" )>${pokemon.name}</h1>
                <p><strong>Type:</strong> ${types}</p>
                <p><strong>Race:</strong> ${race}</p>
              `;

              localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));
            });
        });

        listeDiv.appendChild(img);
      });
    });
  });

document.getElementById("details").addEventListener("click", (event) => {
  event.preventDefault();

  const selectedPokemon = localStorage.getItem("selectedPokemon");
  if (selectedPokemon) {
    window.location.href = "details.html";
  } else {
    alert("Vælg venligst en Pokémon først!");
  }
});
