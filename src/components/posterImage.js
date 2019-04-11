import React, { useState } from 'react';
import ReactImageFallback from "react-image-fallback";
import { FallbackImage } from './fallbackImage';

export const PosterImage = ({
        Film, 
        openModal, 
        small 
    }) => {
        
    const [imageLoaded, setImageLoaded] = useState(false);
    const openModalIfImageLoaded = () => {
        if (imageLoaded && openModal) {
            openModal(Film)
        }
    }

    return (
        <ReactImageFallback
            onClick={() => {openModalIfImageLoaded()}} 
            fallbackImage={<FallbackImage small={small} />}
            onLoad={() => {setImageLoaded(true)}}
            src={Film.Poster}
            alt={Film.Title}
            className="poster poster--hover" />
    )
}