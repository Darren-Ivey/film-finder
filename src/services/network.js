
import { OMDB_API_KEY } from "../credentials"

export const getVideos = async (searchTerm) => {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${OMDB_API_KEY}&page=2`

    try {
        const result = await fetch(url);
        const data = await result.json();
        return data;
    } catch(err) {
        return err;
    }
};
