function consumiendoapi() {
  const numeroPokemon = document
    .getElementById("holamundo")
    .value.trim()
    .toLowerCase();

  if (!numeroPokemon) {
    Swal.fire("Por favor, introduce un número o nombre de Pokémon.");
    return;
  }

  const numero = parseInt(numeroPokemon);
  if (numero < 1 && isNaN(numero)) {
    Swal.fire({
      title: "Entrada inválida",
      text: "Por favor, ingresa un número positivo o el nombre de un Pokémon.",
      icon: "question",
    });
    return;
  }

  if (/[^\w\s]/.test(numeroPokemon)) {
    Swal.fire({
      title: "Entrada no válida",
      text: "Por favor, ingresa un número positivo o el nombre de un Pokémon sin símbolos.",
      icon: "question",
    });
    return;
  }

  $.ajax({
    type: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`,
    dataType: "json",
    success: function (datos) {
      const { name, id, weight, height, sprites } = datos;

      const html = `
        <div class="pokemon-card">
          <img src="${sprites.front_default}" alt="${name}">
          <div class="pokemon-info">
            <p>Nombre: ${name}</p>
            <p>ID: ${id}</p>
            <p>Altura: ${height}</p>
            <p>Peso: ${weight}</p>
          </div>
        </div>
      `;

      $("#contenedor").prepend(html);
      guardarPokemonEnLocalStorage({ name, id, weight, height, sprites });
    },
    error: function () {
      Swal.fire({
        title: "No se encontró este Pokémon, inténtalo de nuevo.",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          left top
          no-repeat
        `,
      });
    },
  });
}
//s
