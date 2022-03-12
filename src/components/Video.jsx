import React from "react";

const Video = (props) => {
  const { videos } = props;

  return (
    videos &&
    videos.map((video) => {
      const { type, id, key } = video;

      return type === "Trailer" ||
        type === "Teaser" ||
        type === "Featurette" ? (
        <div key={id} className="trailer--content">
          <iframe
            src={`https://www.youtube.com/embed/${key}`}
            frameBorder="0"
            allowFullScreen
            title="Embedded_youtube"
          />
        </div>
      ) : (
        ""
      );
    })
  );
};

export default Video;
