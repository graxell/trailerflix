module.exports = {
  randomBanner: (showList) => {
    if (showList) {
      const showForBanner =
        showList[Math.floor(Math.random() * showList.length)];
      return showForBanner;
    }
  },

  homepageHeadings: (key) => {
    if (key === "trending") {
      return "Trending Now";
    } else if (key === "popularMovies") {
      return "Must-watch Films";
    } else if (key === "popularSeries") {
      return "Popular Series";
    } else if (key === "topRatedMovies") {
      return "Discover Great Films";
    } else {
      return "Binge-worthy TV Shows";
    }
  },

  newAndPopularHeadings: (key) => {
    if (key === "airingToday") {
      return "Don't miss on TV today!";
    } else if (key === "latest") {
      return "Latest Films";
    } else if (key === "ongoingTv") {
      return "Programmes currently on air";
    } else {
      return "Coming soon in theatres";
    }
  },
};

// {mediaType === "movie" ? (
//   <h2 className="list__results--heading">
//     <span className="pre--heading" onClick={() => setShowList()}>
//       {heading} &gt;{" "}
//     </span>{" "}
//     {mediaType === "tv" ? `${genreName} Programmes` : genreName}
//   </h2>
// ) : (
//   <h2 className="list__results--heading">
//     <span className="pre--heading" onClick={() => setShowList()}>
//       {heading} &gt;{" "}
//     </span>{" "}
//     {genreName} Programmes
//   </h2>
// )}
