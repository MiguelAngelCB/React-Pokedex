import { saveJSONFile } from "./saveJSONFile";

export const fetchTypeDamageData = async () => {
  try {
    const typesResponse = await fetch("https://pokeapi.co/api/v2/type");
    const typesData = await typesResponse.json();
    const types = typesData.results; // Lista de tipos

    const allTypeData = {};
    for (const type of types) {
      const typeDetailsResponse = await fetch(type.url);
      const typeDetails = await typeDetailsResponse.json();

      const damageRelations = {};

      typeDetails.damage_relations.double_damage_to.forEach(
        (t) => (damageRelations[t.name] = 2)
      );
      typeDetails.damage_relations.half_damage_to.forEach(
        (t) => (damageRelations[t.name] = 0.5)
      );
      typeDetails.damage_relations.no_damage_to.forEach(
        (t) => (damageRelations[t.name] = 0)
      );

      // Guardar el resultado en el objeto principal
      allTypeData[typeDetails.name] = damageRelations;
    }
    console.log(allTypeData);
    // 3. Guardar datos en un archivo JSON descargable
    saveJSONFile(allTypeData, "type_damage_data.json");
  } catch (error) {
    console.error("Error fetching type damage data:", error);
  }
};
