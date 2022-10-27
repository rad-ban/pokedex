import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPokemon } from './lib/pokemon'
import styles from '../styles/Home.module.css'

export default function Home({pokemonList}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex | Radu Banu</title>
        <meta name="description" content="Pokedex built with Next.js and PokeAPI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header>
          <div className={styles.logo}>
            <Link href="/" title="Pokedex">
              <a>
                <Image src="/assets/pokeball.png" width="100" height="100" />
                <Image src="/assets/pokemon_logo.png" width="300" height="100" />
              </a>
            </Link>
          </div>
        </header>
        <ul className={styles.grid}>
          {pokemonList.map((pokemon, index) => (
            <li key={index} className={styles.card}>
              <Link href={`/pokemon/${pokemon.name}/`}>
                <a>
                  <Image src={pokemon.image} alt={pokemon.name} width="200" height="200"/>
                  <h3>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h3>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  // Fetch data from external API
  const { results } = await getAllPokemon('pokemon?limit=9');

  const pokemonList = results.map((result, index) => {
    const pokemonImageId = ("00" + (index + 1)).slice(-3)
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonImageId}.png`
    return {
      ...result,
      image
    }
  });

  // Pass data to the page via props
  return {
      props: {pokemonList}
    }
}