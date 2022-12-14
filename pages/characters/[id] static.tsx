import {Character, GetCharacterResults} from "../../types";
import Image from "next/image";
import imageLoader from "../../imageLoader";

function CharacterPage({character}: { character: Character }) {
    return <div>
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

// fetch an array of ids
export async function getStaticPaths() {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const { results }: GetCharacterResults = await res.json();

    return {
        paths: results.map((character) => {
            return { params: { id: String(character.id) } };
        }),
        fallback: false,
    };
}

// fetch data for each item (character)
export async function getStaticProps({ params }: { params: { id: string } }) {
    const res = await fetch(
        `https://rickandmortyapi.com/api/character/${params.id}`
    );
    const character = await res.json();

    return {
        props: {
            character,
        },
    };
}


export default CharacterPage;