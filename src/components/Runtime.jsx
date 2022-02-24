import React from 'react';

const Runtime = (props) => {

    const hours = Math.floor(props.runtime / 60);
    const minutes = props.runtime % 60;

    return (<> {`${hours}h ${minutes}m `}</>);
}
 
export default Runtime;