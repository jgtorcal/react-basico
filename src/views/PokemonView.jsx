import React from 'react';

function PokemonView({ pokemon }) {
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.description}</p>
      <p>Types: {pokemon.details.types.map(type => type.type.name).join(", ")}</p>
      <p>Height: {pokemon.details.height}</p>
      <p>Weight: {pokemon.details.weight}</p>
    </div>
  );
}

export default PokemonView;
