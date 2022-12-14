import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {GetStaticProps, NextPage} from "next";
import {Character, GetCharacterResults} from "../types";
import imageLoader from "../imageLoader";
import Link from 'next/link';
import { server } from '../config'

const Home: NextPage<{ characters: Character[] }> = ({characters}) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
            </Head>

            {characters.map((character) => {
                return <div key={character.id}>
                    <Link href={`/characters/${character.id}`}>
                    {character.name}
                    </Link>
                    <Image
                        loader={imageLoader}
                        unoptimized
                        src={character.image}
                        alt={character.name}
                        width="200"
                        height="200"/>
                </div>
            })}
        </div>
    )
}


//build alatt fut
// export const getStaticProps: GetStaticProps = async (context) => {
//     const res = await fetch("https://rickandmortyapi.com/api/character");
//     const {results}: GetCharacterResults = await res.json();
//
//     return {
//         props: {
//             characters: results,
//         }
//     }
//
// }

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch(`${server}/api/search`)
    const {results}: GetCharacterResults = await res.json();

    return {
        props: {
            characters: results,
        }
    }
}

export default Home;
