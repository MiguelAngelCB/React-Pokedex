import { useState, useEffect } from "react";

export const useFetch = (fetchFunction, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Comienza la carga
      setError(null); // Resetea el error
      try {
        const result = await fetchFunction(); // Llama la función de fetch
        setData(result); // Actualiza los datos
      } catch (error) {
        setError(error); // Si ocurre un error, actualiza el estado
      } finally {
        setLoading(false); // Cuando termina la carga, cambia el estado a false
      }
    };

    fetchData(); // Ejecuta la función de carga
  }, deps); // Solo se vuelve a ejecutar si las dependencias cambian

  return { data, loading, error };
};
