function changePageTitle(title) {
    document.title = title
}

function generateInfoSection(src, pokemonName) {
    const h2 = document.createElement('h2')
    h2.id = "info-pokemon-label"
    h2.textContent = `Informações sobre ${pokemonName}`

    const img = document.querySelector('img')
    img.src = src
    img.alt = `Imagem do pokemon ${pokemonName}`

    const section = document.querySelector('#info-pokemon')

    section.appendChild(h2)
    section.appendChild(img)
}

async function getPokemonData(name) {
    // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    //   .then((fetchData) => {
    //     return fetchData.json()
    //   })
    //   .then((jsonData) => generateInfoSection(jsonData.sprites.front_default, name))
    //   .catch((error) => console.error(error))

    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

        const jsonData = await data.json()

        generateInfoSection(jsonData.sprites.front_default, name)
    } catch (error) {
        console.error(error)
    }
}

function getSearchParams() {

    if (!location.search) {
        return
    }


    const urlSearchParams = new URLSearchParams(location.search)


    const pokemonName = urlSearchParams.get('name')

    changePageTitle(`Pagina do ${pokemonName}`)
    getPokemonData(pokemonName)
}

document.addEventListener('DOMContentLoaded', function () {
    getSearchParams()
})

function updateVisitCounter() {
    let visitaDados = localStorage.getItem('visitData');
    if (!visitaDados) {
      visitaDados = { count: 0, lastVisit: '' };
    } else {
      visitaDados = JSON.parse(visitaDados);
    }

    visitaDados.count++;
    const dataAtual = new Date();
    const formato = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    visitaDados.lastVisit = formato.format(dataAtual);

    localStorage.setItem('visitData', JSON.stringify(visitaDados));


    const visitParagraph = document.getElementById('visit-data');
    visitParagraph.textContent = `Esta página foi visitada ${visitaDados.count} vezes. A última visita foi: ${visitaDados.lastVisit}`;
  }

  
  document.addEventListener('DOMContentLoaded', function () {
    updateVisitCounter();
  });

function handleSpriteClick(sprites) {
    const spriteArray = Object.values(sprites).filter(sprite => typeof sprite === 'string');
    let currentSpriteIndex = 0;

    const imgElemento = document.querySelector('img');
    imgElemento.src = spriteArray[currentSpriteIndex];

    imgElemento.addEventListener('click', function () {
        currentSpriteIndex++;
        if (currentSpriteIndex >= spriteArray.length) {
            currentSpriteIndex = 0;
        }
        imgElemento.src = spriteArray[currentSpriteIndex];
    });
}

async function getPokemonData(nome) {
    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
        const jsonData = await data.json();

        generateInfoSection(jsonData.sprites, nome);
        handleSpriteClick(jsonData.sprites);
    } catch (error) {
        console.error(error);
    }
}
