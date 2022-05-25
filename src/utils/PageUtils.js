export const randomBanner = (showList) => {
  if (showList) {
    const showForBanner = showList[Math.floor(Math.random() * showList.length)];
    return showForBanner;
  }
};

export const homepageHeadings = [
  "Trending Now",
  "Must-watch Films",
  "Popular Series",
  "Discover Great Films",
  "Binge-worthy TV Shows",
];

export const newAndPopularHeadings = [
  "Don't miss on TV today!",
  "Latest Films",
  "Programmes currently on air",
  "Coming soon in theatres",
];
