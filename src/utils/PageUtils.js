module.exports = {
  randomBanner: (showList) => {
    if (showList) {
      const showForBanner =
        showList[Math.floor(Math.random() * showList.length)];
      return showForBanner;
    }
  },

  homepageHeadings: [
    "Trending Now",
    "Must-watch Films",
    "Popular Series",
    "Discover Great Films",
    "Binge-worthy TV Shows",
  ],

  newAndPopularHeadings: [
    "Don't miss on TV today!",
    "Latest Films",
    "Programmes currently on air",
    "Coming soon in theatres",
  ],
};
