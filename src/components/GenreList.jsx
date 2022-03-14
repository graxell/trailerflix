import React from 'react';

const GenreList = (props) => {
    return props.genre && props.genre.map((genre) => {
        return <li>{genre}</li>
    });
}
 
export default GenreList;