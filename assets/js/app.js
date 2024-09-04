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
      const selectedImageDiv = document.getElementById("image");
      const selectedInfoDiv = document.getElementById("info");

      pokemonDetails.forEach((pokemon) => {
        const img = document.createElement("img");
        img.src = pokemon.sprites.front_default;

        img.addEventListener("click", () => {
          const newUrl = new URL(window.location);
          newUrl.searchParams.set("name", pokemon.name);
          window.history.pushState({}, "", newUrl);

          selectedImageDiv.innerHTML = "";
          selectedInfoDiv.innerHTML = "";

          const selectedImg = document.createElement("img");
          selectedImg.src = pokemon.sprites.front_default;
          selectedImageDiv.appendChild(selectedImg);

          const info = document.createElement("div");
          info.innerHTML = `
                        <h1>${pokemon.name}</h1>
                        <p><strong>Base Experience:</strong> ${pokemon.base_experience}</p>
                        <p><strong>Weight:</strong> ${pokemon.weight}</p>
                    `;
          selectedInfoDiv.appendChild(info);

          localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));
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
