import "./App.css";
import Card from "./components/Card";
import { useState, useEffect } from "react";

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const details = await response.json();
            return {
              name: details.name,
              description: `Tipo: ${details.types.map(type => type.type.name).join(", ")}`,
              image: details.sprites.front_default
            };
          })
        );
        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);

  const pokemonCards = pokemonList.map((pokemon, index) => (
    <Card key={index} title={pokemon.name} description={pokemon.description} image={pokemon.image} />
  ));

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <div className="container">{pokemonCards}</div>
    </div>
  );
}

export default App;
