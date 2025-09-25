document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const navbar = document.getElementById("navbar");
  const types = [...new Set([...pokemons.map((p) => p.type).flat()])];

  function showPokemons(type) {
    const pokemonsDivs = pokemons
      .map((pokemon) => {
        if (pokemon.type.includes(type) || pokemon.type === type) {
          return `<div class="pokemonCard">
    <h2>${pokemon.name.english}</h2>
    <div>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      pokemon.id
    }.png">
    <span>Type: ${pokemon.type.join(", ")}</span>
    <span>Attack: ${pokemon.base.Attack}</span>
    </div>   
    </div>`;
        }
      })
      .slice(0, 10);
    container.innerHTML = pokemonsDivs.join("");
  }

  function showButtons() {
    const buttons = types.map((t) => {
      const buttonTipo = document.createElement("button");
      buttonTipo.innerText = t;
      buttonTipo.addEventListener("click", () => {
        showPokemons(t);
        console.log(t);
        
      });
      return buttonTipo;
    });
    navbar.append(...buttons);
  }

  showButtons();
  showPokemons();
});

/*`<div class="pokemonCard">
    <h2>${pokemon.name.english}</h2>
    <div>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      pokemon.id
    }.png">
    <span>Type: ${pokemon.type.join(", ")}</span>
    <span>Attack: ${pokemon.base.Attack}</span>
    </div>   
    </div>`;*/
