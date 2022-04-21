// const fs = require("fs");

module.exports = {
  mediaType: function (title) {
    if (title) {
      return "movie";
    } else {
      return "tv";
    }
  },

  //Image path handler
  imageUrlPath: function (path, alt) {
    const imageURL = `https://image.tmdb.org/t/p/original${path}`;
    if (path) {
      return imageURL;
    } else {
      return alt;
    }
  },

  //Show Title Handler
  showTitleHandler: function (title, name) {
    if (title) {
      return title;
    } else {
      return name;
    }
  },

  //Show Release Year
  showReleaseDate: function (releaseDate, airDate) {
    if (releaseDate) {
      return releaseDate;
    } else if (airDate) {
      return airDate;
    } else {
      return "Unknown";
    }
  },

  //show ratings
  showRatings: function (rating) {
    if (rating > 3) {
      return Math.round(rating * 10) / 10;
    } else {
      return rating;
    }
  },
};

// export const mediaType = (title) => {
//   if (title) {
//     return "movie";
//   } else {
//     return "tv";
//   }
// };

// //Image path handler
// export const imageUrlPath = (path, alt) => {
//   const imageURL = `https://image.tmdb.org/t/p/original${path}`;
//   if (path) {
//     return imageURL;
//   } else {
//     return alt;
//   }
// };

// //Show Title Handler
// export const showTitleHandler = (title, name) => {
//   if (title) {
//     return title;
//   } else {
//     return name;
//   }
// };

// //Show Release Year
// export const showReleaseDate = (releaseDate, airDate) => {
//   if (releaseDate) {
//     return releaseDate;
//   } else if (airDate) {
//     return airDate;
//   } else {
//     return "Unknown";
//   }
// };

// export const showReleaseYear = (releaseDate, airDate) => {
//   return showReleaseDate(releaseDate, airDate).substring(0, 4);
// };

// //show ratings
// export const showRatings = (rating) => {
//   if (rating > 3) {
//     return Math.round(rating * 10) / 10;
//   } else {
//     return rating;
//   }
// };
