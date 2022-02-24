import React from 'react';
import { useState } from 'react';

const Poster = (props) => {

    const [ backdrop, setBackdrop ] = useState(0);

    return (<> {props.posters && props.posters.map((poster) => {
        setTimeout(()=> {
            setBackdrop(poster.filepath);
        }, 1000);
        return <img src={`https://image.tmdb.org/t/p/original/${backdrop}`} alt="poster" key={poster.index}/>

    })} 
    </>);
}
 
export default Poster;