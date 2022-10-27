export async function getAllPokemon(endpoint) {
    const res = await fetch(`https://pokeapi.co/api/v2/${endpoint}`);
    return await res.json();
}