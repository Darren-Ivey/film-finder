import React from 'react';

export const FallbackImage = ({small}) =>
    <div className={`poster__img ${small && "poster__img--small"}`}>Poster not available</div>