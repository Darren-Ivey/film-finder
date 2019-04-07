import React from 'react';

const modifierClass = (small) => 
    small &&"poster__button--small"

export const FallbackImage = ({small}) =>
    <div className={`poster__button ${modifierClass(small)}`}>Poster not available</div>