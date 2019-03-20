import React, { useState } from 'react';
import { getVideos } from "../services/network";

const Form = ({ handleResponse, setParentSearchTerm }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setParentSearchTerm(searchTerm);

        getVideos(searchTerm)
        .then((res) => {
            handleResponse(res);
            setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            })
    }

    return (
        <div className="filmFinder">
            <h1>Find films!</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    onChange={handleInputChange} 
                    type="search" name="search-movies" 
                    value={searchTerm} />
                <button disabled={loading} type="submit">
                    { loading ? "Finding films" : "Search" }
                </button>
            </form>
        </div>
    )
}

export default Form;