import {Character} from "../../types";
import Image from "next/image";
import imageLoader from "../../imageLoader";
import {GetServerSideProps} from "next";
import styles from "../../styles/Character.module.css";

function CharacterPage({character}: { character: Character }) {
    return <div className={styles.container}>
        <h1>{character.name}</h1>
        <Image
            loader={imageLoader}
            unoptimized
            src={character.image}
            alt={character.name}
            width="200"
            height="200"
        />
    </div>
}


// fetch data for each item (character) from server
// useful for sites with dynamic data
// next call automatically every time when call the id page
export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`);
    const character = await res.json();
    return {
        props: {
            character,
        }
    }
}

export default CharacterPage;