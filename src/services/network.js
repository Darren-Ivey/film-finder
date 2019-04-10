
import { OMDB_API_KEY } from "../credentials"

export const getVideos = async (searchTerm, page = 1) => {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${OMDB_API_KEY}&page=${page}`;

    try {
        const results = await fetch(url);
        const data = await results.json();
        return data;
    } catch(err) {
        return err;
    }
};
