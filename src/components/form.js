import React, { useState } from 'react';
import { getVideos } from "../services/network";

export const Form = ({ handleResponse, setParentSearchTerm }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setParentSearchTerm(searchTerm.trim());

        getVideos(searchTerm.trim())
        .then((res) => {
            handleResponse(res);
            setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            })
    }

    return (
        <div className="film__finder"> 
            <h1>Find films!</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    onChange={handleInputChange}
                    type="search"
                    name="search-movies"
                    className="search__input"
                    value={searchTerm} />
                <button className="search__button" disabled={loading}>
                    { loading ? "finding" : "search" }
                </button>
            </form>
        </div>
    )
}