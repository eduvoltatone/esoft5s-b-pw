document.addEventListener("DOMContentLoaded", function() {

    function obterParametroDaUrl(nomeParametro) {
        const parametros = new URLSearchParams(window.location.search);
        return parametros.get(nomeParametro);
    }
    
    function carregarPokemon(nomePokemon) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
            .then(response => response.json())
            .then(data => {
                const pokemonInfo = document.getElementById('pokemon-info');
                const pokemonImage = document.createElement('img');
                pokemonImage.src = data.sprites.front_default;
                pokemonImage.alt = `Imagem do ${nomePokemon}`;
                pokemonInfo.appendChild(pokemonImage);
            })
    }

    const nomeEvolucao = obterParametroDaUrl('evolucao');

    if (nomeEvolucao) {

        document.title = `Página do Pokémon ${nomeEvolucao}`;
        

        carregarPokemon(nomeEvolucao);
    } else {
        console.error('Nome da evolução não fornecido na URL.');
    }
});
