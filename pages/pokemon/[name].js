import { useRouter } from 'next/router'
import { getAllPokemon } from '../lib/pokemon'
import Link from 'next/link'
import Image from 'next/image'

export default function Pokemon({ pokemon, image }) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>{pokemon.name}</h1>
      <Image src={image} alt={pokemon.name} width="200" height="200" />
    </>
  )
}

  // This function gets called at build time
  export async function getStaticPaths() {
    // Call an external API endpoint to get Pokemons
    const { results } = await getAllPokemon('pokemon');

    // Get the paths we want to pre-render based on results
    const paths = results.map((pokemon) => ({
        params: { name: pokemon.name, id: pokemon.id }
    }))
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false,}
  }

  // This also gets called at build time
  export async function getStaticProps({ params }) {
    // params contains the Pokemon `name`.
    // If the route is like /Pokemons/1, then params.name is 1
    const pokemon  = await getAllPokemon(`pokemon/${params.name}`);

    const pokemonImageId = ('000' + (pokemon.id)).slice(-3)
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonImageId}.png`

    if (!pokemon) {
      return {
        notFound: true,
      }
    }

    // Pass Pokemon data to the page via props
    return { props: { pokemon, image } }
  }