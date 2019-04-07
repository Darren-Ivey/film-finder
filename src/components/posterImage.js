import React, { useState } from 'react';
import ReactImageFallback from "react-image-fallback";
import { FallbackImage } from './fallbackImage';

export const PosterImage = ({ Film, openModal }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const openModalIfImageLoaded = () => {
        if (imageLoaded) {
            openModal(Film)
        }
    }

    return (
        <div onClick={() => {openModalIfImageLoaded()}} 
            className="poster__container" >
            <ReactImageFallback
                fallbackImage={<FallbackImage />}
                onLoad={() => {setImageLoaded(true)}}
                src={Film.Poster}
                alt={Film.Title}
                className="poster poster--hover" />
            }
        </div>
    )
}