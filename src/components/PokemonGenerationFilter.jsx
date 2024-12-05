import React from "react";

export function PokemonGenerationFilter({ selectedGenerations, handleGenerationChange }) {
  const generations = [
    { id: "generation-i", label: "Generation I" },
    { id: "generation-ii", label: "Generation II" },
    { id: "generation-iii", label: "Generation III" },
    { id: "generation-iv", label: "Generation IV" },
    { id: "generation-v", label: "Generation V" },
    { id: "generation-vi", label: "Generation VI" },
    { id: "generation-vii", label: "Generation VII" },
    { id: "generation-viii", label: "Generation VIII" },
  ];

  return (
    <div className="generation-filter">
      <h4>Filter by Generation</h4>
      <div className="generation-checkboxes">
        {generations.map((generation) => (
          <label key={generation.id}>
            <input
              type="checkbox"
              value={generation.id}
              checked={selectedGenerations.includes(generation.id)}
              onChange={() => handleGenerationChange(generation.id)}
            />
            {generation.label}
          </label>
        ))}
      </div>
    </div>
  );
}
