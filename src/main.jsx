import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonView from "./views/PokemonView";

const Main = () => {
  const [routes, setRoutes] = useState([
    {
      path: "/",
      element: <App />,
    },
  ]);

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
              image: details.sprites.front_default,
              details: details,
            };
          })
        );

        const newRoutes = [
          {
            path: "/",
            element: <App />,
          },
        ];

        pokemonData.forEach((pokemon) => {
          newRoutes.push({
            path: pokemon.name,
            element: <PokemonView pokemon={pokemon} />,
          });
        });

        setRoutes(newRoutes);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
