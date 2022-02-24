import React from "react";

const Video = (props) => {
  return (
    props.videos &&
    props.videos.map((video) => {
      if (video.type === "Trailer" || video.type === "Teaser") {
        return (
          <div key={video.id} className="trailer--content">
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              frameBorder="0"
              allowFullScreen
              title="Embedded_youtube"
            />
          </div>
        );
      }
    })
  );
};

export default Video;
