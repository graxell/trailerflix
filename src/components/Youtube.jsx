import React from 'react';
import PropTypes from 'prop-types';

const Youtube = ({embedId}) => {
    return (
        <>
            <div className="trailer--content">
            <iframe
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded_youtube"
            />
            </div>
        </>
    )
};
  
Youtube.propTypes = {
    embedId: PropTypes.string.isRequired
};
  
  export default Youtube;