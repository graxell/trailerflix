export const getMediaType = function (title) {
  if (title) {
    return "movie";
  } else {
    return "tv";
  }
};

//Image path handler
export const imageUrlPath = function (path, alt) {
  const imageURL = `https://image.tmdb.org/t/p/original${path}`;
  if (path) {
    return imageURL;
  } else {
    return alt;
  }
};

//Show Title Handler
export const showTitleHandler = function (title, name) {
  if (title) {
    return title;
  } else {
    return name;
  }
};

//Show Release Year
export const showReleaseDate = function (releaseDate, airDate) {
  if (releaseDate) {
    return releaseDate;
  } else if (airDate) {
    return airDate;
  } else {
    return "Unknown";
  }
};

export const displayReleaseDate = (release) => {
  const date = new Date(release).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return date;
};

export const getDate = (date) => {
  const newDate = new Date(`'${date}'`.split("T")).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
  });

  return newDate;
};

export const displayLanguage = new Intl.DisplayNames(["en"], {
  type: "language",
});

//show ratings
export const showRatings = function (rating) {
  if (rating > 3) {
    return Math.round(rating * 10) / 10;
  } else {
    return rating;
  }
};

export const headingFormat = (heading) => {
  const formatted = heading
    .replace(/_/g, " ")
    .replace(/(^\w|\s\w)/g, (firstCharOfWord) => firstCharOfWord.toUpperCase());
  return formatted;
};
