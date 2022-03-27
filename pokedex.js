const typed = new Typed('.typed', {
    stringsElement: '#CadenaTitulo',
    typeSpeed: 75,
    startDelay: 300,
    cursorChar: '|'
})
const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("nombrePokemon");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("Imagenes/pokemonstriste.gif")
            document.getElementById("Información").style.display = "none";
            document.getElementById("Moves").style.display = "none"
            document.getElementById("nombreytipos").style.display = "none"
            document.getElementById("Número").style.display = "none"
            document.getElementById("Stats").style.display = "none"
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {       
            console.log(data);
            let fotoPokemon = data.sprites.other['official-artwork'].front_default;
            pokeImage(fotoPokemon);
            let types = Type(data.types);
            PokeTypes(types)
            let pokeID = data.id;
            document.getElementById("ID").innerHTML= ("Número:" + pokeID);
            let Name = data.name;
            document.getElementById("Name").innerHTML= (Name);
            document.getElementById("Información").style.display = "block";
            document.getElementById("Moves").style.display = "grid"
            document.getElementById("nombreytipos").style.display = "flex"
            document.getElementById("Número").style.display = "grid"
            document.getElementById("Stats").style.display = "grid"
            pokestats(data.stats);
            pokemoves(data.moves);
        }
    });
}
const pokeImage = (url) => {
    const fotoPokemon = document.getElementById("fotoPokemon");
    fotoPokemon.src = url;
}

const Type = (Types) => {
    let typeslist = [];
    Types.forEach(type => {
        typeslist.push(type.type.name);
    });
    return typeslist;
}
const PokeTypes = (type) => {
    const pokeTypes= document.getElementById("Types");
    pokeTypes.innerHTML = ''
    type.forEach(type =>{
        pokeTypes.innerHTML +=  `<i class="type-${type}">${type} </i>`;
    })
}
const pokestats = (stats) => {
    const pokestats = document.getElementById("Stats");
    pokestats.innerHTML = ''
    stats.forEach(stat => {
        console.log(stat);
        pokestats.innerHTML += `<i class="stat">${stat.stat.name}: ${stat.base_stat}</i>`
    })
}
const pokemoves = (moves) => {
    const pokemoves = document.getElementById("Moves");
    pokemoves.innerHTML = ''
    moves.forEach(move => {
        console.log(move);
        pokemoves.innerHTML += `<i class="move">${move.move.name}</i>`
    })
}